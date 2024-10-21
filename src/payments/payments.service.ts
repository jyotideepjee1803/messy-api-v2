import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Razorpay = require('razorpay');
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils.js';
import { Payment } from './entities/payment.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private razorpay: Razorpay;

  constructor(
    private readonly configService : ConfigService,
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(Coupon.name) private couponModel: Model<Coupon>,
  ) {
    this.razorpay = new Razorpay({
      key_id: this.configService.get('RAZORPAY_ID_KEY'),
      key_secret:  this.configService.get('RAZORPAY_SECRET_KEY'),
    });
  }

  // Method to initiate payment
  async initiatePayment(selected: boolean[][], amount: number): Promise<any> {
    const order = await this.razorpay.orders.create({
      amount: amount * 100, // Convert to smallest currency unit
      currency: 'INR',
    });

    // Create a payment record in the database
    await this.paymentModel.create({ orderId: order.id, selected });
    
    return order;
  }

  // Method to verify payment status
  async verifyPaymentStatus(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    userEmail: string,
  ): Promise<boolean> {
    // Validate payment signature
    const isValid = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      this.configService.get('RAZORPAY_SECRET_KEY')
    );

    if (isValid) {
      // Find the payment order and update the user's coupon info
      const order = await this.paymentModel.findOne({ orderId: razorpay_order_id });
      if (order) {
        await this.couponModel.findOneAndUpdate(
          { email: userEmail },
          { $set: { week: order.selected, taken: true } },
          { upsert: true, new : true },
        );
      }
    }

    return isValid;
  }
}
