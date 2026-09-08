import mongoose from 'mongoose';
import { ActivityModel } from '../models/activity.js';
import { LeaderboardModel } from '../models/leaderboard.js';
import { TeamModel } from '../models/team.js';
import { UserModel } from '../models/user.js';
import { WorkoutModel } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      TeamModel.deleteMany({}),
      UserModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const [alex, sam, jordan] = await UserModel.create([
      {
        username: 'alex.runner',
        email: 'alex.runner@example.com',
        password: 'octofit-demo',
        profile: { displayName: 'Alex Rivera' },
      },
      {
        username: 'sam.lifter',
        email: 'sam.lifter@example.com',
        password: 'octofit-demo',
        profile: { displayName: 'Sam Lee' },
      },
      {
        username: 'jordan.yoga',
        email: 'jordan.yoga@example.com',
        password: 'octofit-demo',
        profile: { displayName: 'Jordan Patel' },
      },
    ]);

    const [team] = await TeamModel.create([
      {
        name: 'Morning Momentum',
        description: 'A friendly team focused on consistent morning training.',
        captain: alex._id,
        members: [alex._id, sam._id, jordan._id],
      },
    ]);

    await ActivityModel.create([
      {
        user: alex._id,
        team: team._id,
        type: 'Run',
        durationMinutes: 35,
        distanceKm: 5.2,
        calories: 410,
        completedAt: new Date('2026-09-08T06:30:00Z'),
      },
      {
        user: sam._id,
        team: team._id,
        type: 'Strength training',
        durationMinutes: 45,
        calories: 360,
        completedAt: new Date('2026-09-07T07:00:00Z'),
      },
      {
        user: jordan._id,
        team: team._id,
        type: 'Yoga',
        durationMinutes: 30,
        calories: 160,
        completedAt: new Date('2026-09-07T06:45:00Z'),
      },
    ]);

    await LeaderboardModel.create([
      { user: alex._id, team: team._id, points: 860, rank: 1, period: 'September 2026' },
      { user: sam._id, team: team._id, points: 740, rank: 2, period: 'September 2026' },
      { user: jordan._id, team: team._id, points: 620, rank: 3, period: 'September 2026' },
    ]);

    await WorkoutModel.create([
      {
        user: alex._id,
        title: 'Tempo run builder',
        goal: 'Improve cardiovascular endurance',
        difficulty: 'intermediate',
        exercises: [
          { name: 'Easy warm-up', sets: 1, repetitions: 10 },
          { name: 'Tempo intervals', sets: 4, repetitions: 5 },
        ],
        scheduledFor: new Date('2026-09-09T06:30:00Z'),
      },
      {
        user: sam._id,
        title: 'Full-body strength',
        goal: 'Build functional strength',
        difficulty: 'beginner',
        exercises: [
          { name: 'Goblet squat', sets: 3, repetitions: 12 },
          { name: 'Push-up', sets: 3, repetitions: 10 },
        ],
        scheduledFor: new Date('2026-09-09T07:00:00Z'),
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
