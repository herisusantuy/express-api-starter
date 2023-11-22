import mongoose, { Schema, model } from 'mongoose';
import { IProject } from '@interfaces';

const projectScheme = new Schema<IProject>({
  title: {
    type: String,
    required: true,
    max: 50,
    unique: true
  },
  description: {
    type: String,
    required: true,
    max: 500
  },
  technologies: [
    {
      type: String
    }
  ],
  type: {
    type: String,
    required: true,
    enum: ['Web Development', 'Mobile Development', 'Mentoring']
  }
});

const Project = model<IProject>('Project', projectScheme);

export default Project;
