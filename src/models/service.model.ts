import mongoose, { Schema, model } from 'mongoose';
import { IService } from '@interfaces';

const serviceSchema = new Schema<IService>({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

const Service = model('Service', serviceSchema);
export default Service;
