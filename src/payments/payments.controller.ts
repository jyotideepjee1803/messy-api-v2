import { Controller, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { CustomRequest } from 'src/auth/custom-request.interface';

@UseGuards(AuthGuard)
@Controller('payment')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Post('initiate')
    async initiatePayment(@Body() body: { selected: boolean[][], amount: number }, @Res() res: Response) {
        const { selected, amount } = body;
        const order = await this.paymentsService.initiatePayment(selected, amount);
        res.send(order);
    }

  // Endpoint to check payment status
    @Post('status')
    async paymentStatus(
        @Body() body: { razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string },
        @Req() req: CustomRequest,
        @Res() res: Response,
    ) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
        const isValid = await this.paymentsService.verifyPaymentStatus(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        req.user?.email,
        );

        res.json(isValid);
    }
}
