import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from './entities/coupon.entity';
import { Model } from 'mongoose';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
    constructor(@InjectModel(Coupon.name) private couponModel: Model<Coupon>) {}

    async createCoupon(createCouponDto : CreateCouponDto): Promise<Coupon>{
        const newCoupon = new this.couponModel(createCouponDto);
        return newCoupon.save();
    }

    async couponValidity(email: string, day: number, mealType: number): Promise<boolean> {
        const student = await this.couponModel.findOne({ email });
        if (student && student.week[mealType][day] === true) {
          return true;
        }
        return false;
    }

    async findAll() : Promise<Coupon[]>{
        return this.couponModel.find().exec();
    }

    async findById(id: string): Promise<Coupon> {
        return this.couponModel.findById(id).exec();
    }

    async findOne(email: string) : Promise<Coupon>{
        return this.couponModel.findOne({email})
    }
    
    async deleteCoupon(id: string): Promise<Coupon> {
        return this.couponModel.findByIdAndDelete(id).exec();
    }
      
    async updateCoupon(id: string, updateData: UpdateCouponDto): Promise<Coupon> {
        return this.couponModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async totalMealCount(): Promise<{ breakfast: number; lunch: number; dinner: number }[]> {
        const allCoupons = await this.findAll(); // get all purchased coupons
        let toMake = [
          [0, 0, 0, 0, 0, 0, 0], // Breakfast
          [0, 0, 0, 0, 0, 0, 0], // Lunch
          [0, 0, 0, 0, 0, 0, 0]  // Dinner
        ];
    
        const getDayDifference = (date1: Date, date2: Date): number => {
          const timeDifference = Math.abs(date2.getTime() - date1.getTime());
          return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        };
    
        const currentDateTime = new Date();
    
        allCoupons.forEach(coupon => {
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 7; j++) {
              if (coupon.week[i][j] === true && getDayDifference(new Date(coupon.updatedAt), currentDateTime) <= 7) {
                toMake[i][j]++;
              }
            }
          }
        });
    
        const totalMeals = [];
        for (let j = 0; j < 7; j++) {
          totalMeals.push({
            breakfast: toMake[0][j],
            lunch: toMake[1][j],
            dinner: toMake[2][j],
          });
        }
    
        return totalMeals;
    }
}
