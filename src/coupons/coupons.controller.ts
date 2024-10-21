import { Controller, Get, Post, Body, Param, Delete, Patch, Query, ValidationPipe } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupons')
export class CouponsController {
    constructor(private readonly couponService: CouponsService) {}

    @Post()
    async createCoupon(@Body(ValidationPipe) createCouponDto: CreateCouponDto) {
      return this.couponService.createCoupon(createCouponDto);
    }
  
    @Get()
    async getCoupon(@Query('email') email: string) {
      return this.couponService.findOne(email);
    }

    @Patch(':id')
    async updateCoupon(@Param('id') id: string, @Body() updateData: UpdateCouponDto) {
      return this.couponService.updateCoupon(id, updateData);
    }

    @Delete(':id')
    async deleteCoupon(@Param('id') id: string) {
      return this.couponService.deleteCoupon(id);
    }


    @Post('validity')
    async checkCouponValidity(@Body() body: { email: string; day: number; mealType: number }) {
        const { email, day, mealType } = body;
        return this.couponService.couponValidity(email, day, mealType);
    }

    @Get('totalMealCount')
    async getTotalMealCount() {
        return this.couponService.totalMealCount();
    }
}