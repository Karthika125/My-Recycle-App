// Define TypeScript interfaces for our data models
interface RecyclingActivity {
  id: string;
  type: 'upload' | 'list';
  item: string;
  points: number;
  date: string;
  imageUrl?: string;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  iconType: 'gift' | 'leaf' | 'transit' | 'discount';
  available: boolean;
}

interface UserStats {
  totalPoints: number;
  level: number;
  streakDays: number;
  achievements: Achievement[];
  pointsToNextLevel: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  iconType: string;
  earned: boolean;
  earnedDate?: string;
}

// Main App Component
import React, { useState, useEffect } from 'react';

const RecyclingRewardsApp: React.FC = () => {
  // Application state with TypeScript types
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 235,
    level: 3,
    streakDays: 4,
    achievements: [],
    pointsToNextLevel: 65
  });
  
  const [activities, setActivities] = useState<RecyclingActivity[]>([
    { id: '1', type: 'upload', item: 'Glass Bottle', points: 15, date: 'Today, 10:23 AM' },
    { id: '2', type: 'list', item: 'Cardboard Box', points: 5, date: 'Today, 9:15 AM' },
    { id: '3', type: 'upload', item: 'Aluminum Can', points: 10, date: 'Yesterday, 4:30 PM' },
    { id: '4', type: 'list', item: 'Plastic Container', points: 5, date: 'Yesterday, 2:12 PM' },
    { id: '5', type: 'upload', item: 'Newspaper', points: 10, date: 'Feb 24, 11:45 AM' }
  ]);
  
  const [rewards, setRewards] = useState<Reward[]>([
    { id: '1', name: '10% Off Local Coffee Shop', description: 'Get 10% off your next purchase', cost: 200, iconType: 'discount', available: true },
    { id: '2', name: 'Plant a Tree (Donation)', description: 'We donate to plant a tree', cost: 300, iconType: 'leaf', available: true },
    { id: '3', name: '$5 Public Transit Credit', description: 'Credit for local transit', cost: 500, iconType: 'transit', available: true }
  ]);
  
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [animationPoints, setAnimationPoints] = useState<number>(0);
  
  // Calculate progress percentage for the level bar
  const calculateProgress = (): number => {
    const pointsPerLevel = 100;
    return ((userStats.level * pointsPerLevel) - userStats.pointsToNextLevel) / pointsPerLevel * 100;
  };
  
  // Function to handle recycling activities
  const handleRecyclingAction = (type: 'upload' | 'list'): void => {
    const pointsEarned = type === 'upload' ? 15 : 5;
    const newItem: RecyclingActivity = {
      id: Date.now().toString(),
      type,
      item: type === 'upload' ? 'Recycled Item' : 'Listed Item',
      points: pointsEarned,
      date: 'Just now'
    };
    
    // Update activities
    setActivities([newItem, ...activities]);
    
    // Update user stats
    const newPoints = userStats.totalPoints + pointsEarned;
    let newLevel = userStats.level;
    let newPointsToNextLevel = userStats.pointsToNextLevel - pointsEarned;
    
    if (newPointsToNextLevel <= 0) {
      newLevel += 1;
      newPointsToNextLevel = 100 + newPointsToNextLevel; // Carry over excess points
    }
    
    setUserStats({
      ...userStats,
      totalPoints: newPoints,
      level: newLevel,
      pointsToNextLevel: newPointsToNextLevel
    });
    
    // Show animation
    setAnimationPoints(pointsEarned);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1500);
  };
  
  // Function to redeem rewards
  const redeemReward = (rewardId: string): void => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || reward.cost > userStats.totalPoints) return;
    
    // Update points
    setUserStats({
      ...userStats,
      totalPoints: userStats.totalPoints - reward.cost
    });
    
    // Could add logic here to mark the reward as redeemed or trigger external action
    alert(`You have redeemed: ${reward.name}`);
  };
  
  return (
    <div className="recycling-rewards-app">
      <header className="app-header">
        <h1 className="app-title">EcoRewards</h1>
        <div className="points-display">
          <span className="points-icon">🍃</span>
          <span className="points-value">{userStats.totalPoints} Points</span>
        </div>
      </header>
      
      <main className="dashboard-grid">
        {/* User Stats Card */}
        <UserStatsCard 
          stats={userStats} 
          progressPercentage={calculateProgress()} 
        />
        
        {/* Activity Card */}
        <ActivityCard 
          activities={activities} 
          onUpload={() => handleRecyclingAction('upload')} 
          onList={() => handleRecyclingAction('list')} 
        />
        
        {/* Rewards Card */}
        <RewardsCard 
          rewards={rewards} 
          userPoints={userStats.totalPoints} 
          onRedeem={redeemReward} 
        />
      </main>
      
      {/* Points Animation */}
      {showAnimation && (
        <div className="points-animation">
          +{animationPoints} Points!
        </div>
      )}
    </div>
  );
};

// Component for user stats card
interface UserStatsCardProps {
  stats: UserStats;
  progressPercentage: number;
}

const UserStatsCard: React.FC<UserStatsCardProps> = ({ stats, progressPercentage }) => {
  return (
    <div className="stats-card card">
      <h2 className="card-title">
        <span className="icon trophy-icon">🏆</span>
        Your Stats
      </h2>
      
      <div className="level-progress">
        <div className="level-info">
          <span>Level {stats.level}</span>
          <span>{stats.pointsToNextLevel}/100 to Level {stats.level + 1}</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="streak-container">
        <div className="streak-info">
          <span className="streak-label">Recycling Streak</span>
          <span className="streak-value">{stats.streakDays} Days</span>
        </div>
        <span className="streak-icon">🔄</span>
      </div>
      
      <div className="achievements-section">
        <h3 className="section-title">Recent Achievements</h3>
        <div className="achievements-list">
          <div className="achievement-badge blue">🏅</div>
          <div className="achievement-badge purple">📤</div>
          <div className="achievement-badge yellow">🍃</div>
        </div>
      </div>
    </div>
  );
};

// Component for activity card
interface ActivityCardProps {
  activities: RecyclingActivity[];
  onUpload: () => void;
  onList: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activities, onUpload, onList }) => {
  return (
    <div className="activity-card card">
      <h2 className="card-title">Recent Activity</h2>
      
      <div className="activity-list">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className={`activity-icon ${activity.type === 'upload' ? 'upload-icon' : 'list-icon'}`}>
              {activity.type === 'upload' ? '📤' : '📋'}
            </div>
            <div className="activity-details">
              <div className="activity-name">{activity.item}</div>
              <div className="activity-time">{activity.date}</div>
            </div>
            <div className="activity-points">+{activity.points}</div>
          </div>
        ))}
      </div>
      
      <div className="demo-actions">
        <h3 className="section-title">Demo: Recycle an item</h3>
        <div className="action-buttons">
          <button 
            className="action-button upload-button" 
            onClick={onUpload}
          >
            <span className="button-icon">📤</span>
            Upload Photo
          </button>
          <button 
            className="action-button list-button" 
            onClick={onList}
          >
            <span className="button-icon">📋</span>
            List Item
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for rewards card
interface RewardsCardProps {
  rewards: Reward[];
  userPoints: number;
  onRedeem: (rewardId: string) => void;
}

const RewardsCard: React.FC<RewardsCardProps> = ({ rewards, userPoints, onRedeem }) => {
  return (
    <div className="rewards-card card">
      <h2 className="card-title">
        <span className="icon gift-icon">🎁</span>
        Available Rewards
      </h2>
      
      <div className="rewards-list">
        {rewards.map(reward => {
          const canRedeem = userPoints >= reward.cost;
          return (
            <div key={reward.id} className="reward-item">
              <div className="reward-icon">
                {reward.iconType === 'gift' && '🎁'}
                {reward.iconType === 'leaf' && '🌱'}
                {reward.iconType === 'transit' && '🚌'}
                {reward.iconType === 'discount' && '🏷️'}
              </div>
              <div className="reward-details">
                <div className="reward-name">{reward.name}</div>
                <div className="reward-cost">{reward.cost} points</div>
              </div>
              <button 
                className={`redeem-button ${canRedeem ? 'active' : 'disabled'}`}
                onClick={() => canRedeem && onRedeem(reward.id)}
                disabled={!canRedeem}
              >
                Redeem
              </button>
            </div>
          );
        })}
      </div>
      
      <a href="#" className="view-all-link">View all rewards</a>
    </div>
  );
};

export default RecyclingRewardsApp;

// CSS Styles
const styles = `
/* Base Styles */
:root {
  --primary-color: #38a169;
  --primary-light: #9ae6b4;
  --primary-dark: #2f855a;
  --secondary-color: #4299e1;
  --accent-color: #805ad5;
  --text-color: #2d3748;
  --text-muted: #718096;
  --bg-color: #f7fafc;
  --card-color: #ffffff;
  --border-color: #e2e8f0;
  --success-color: #38a169;
  --warning-color: #ecc94b;
  --danger-color: #e53e3e;
  --border-radius: 10px;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f7f0;
  color: var(--text-color);
  line-height: 1.5;
  padding: 20px;
}

.recycling-rewards-app {
  max-width: 1200px;
  margin: 0 auto;
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--shadow);
}

/* Header Styles */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.app-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-dark);
}

.points-display {
  background-color: var(--card-color);
  padding: 8px 16px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  box-shadow: var(--shadow);
}

.points-icon {
  margin-right: 8px;
}

.points-value {
  font-weight: 600;
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 992px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

/* Card Styles */
.card {
  background-color: var(--card-color);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--shadow);
}

.card-title {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-color);
}

.icon {
  margin-right: 8px;
}

/* Stats Card */
.level-progress {
  margin-bottom: 16px;
}

.level-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
}

.progress-bar-container {
  height: 8px;
  background-color: #edf2f7;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.streak-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0fff4;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.streak-label {
  display: block;
  font-size: 14px;
  color: var(--primary-dark);
}

.streak-value {
  font-weight: 700;
  font-size: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}

.achievements-list {
  display: flex;
  gap: 8px;
}

.achievement-badge {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blue {
  background-color: #ebf8ff;
  color: var(--secondary-color);
}

.purple {
  background-color: #f5f0ff;
  color: var(--accent-color);
}

.yellow {
  background-color: #fffbeb;
  color: var(--warning-color);
}

/* Activity Card */
.activity-list {
  max-height: 250px;
  overflow-y: auto;
  margin-bottom: 16px;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 6px;
  transition: background-color 0.2s;
}

.activity-item:hover {
  background-color: #f0fff4;
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.upload-icon {
  background-color: #ebf8ff;
  color: var(--secondary-color);
}

.list-icon {
  background-color: #f5f0ff;
  color: var(--accent-color);
}

.activity-details {
  flex: 1;
}

.activity-name {
  font-weight: 500;
}

.activity-time {
  font-size: 12px;
  color: var(--text-muted);
}

.activity-points {
  font-weight: 500;
  color: var(--success-color);
}

.demo-actions {
  border: 1px dashed var(--primary-light);
  border-radius: 8px;
  padding: 14px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.action-button:hover {
  opacity: 0.9;
}

.upload-button {
  background-color: var(--secondary-color);
  color: white;
}

.list-button {
  background-color: var(--accent-color);
  color: white;
}

.button-icon {
  margin-right: 6px;
}

/* Rewards Card */
.rewards-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reward-item {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  transition: border-color 0.3s;
}

.reward-item:hover {
  border-color: var(--primary-light);
}

.reward-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #feebc8;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.reward-details {
  flex: 1;
}

.reward-name {
  font-weight: 500;
}

.reward-cost {
  font-size: 13px;
  color: var(--text-muted);
}

.redeem-button {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.redeem-button.active {
  background-color: var(--success-color);
  color: white;
}

.redeem-button.disabled {
  background-color: #f7fafc;
  color: #cbd5e0;
  cursor: not-allowed;
}

.view-all-link {
  display: block;
  text-align: center;
  margin-top: 16px;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

/* Points Animation */
.points-animation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 24px;
  font-weight: 700;
  color: var(--success-color);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  animation: bounceIn 1.5s ease;
  z-index: 100;
}

@keyframes bounceIn {
  0%, 20%, 50%, 80%, 100% {
    transform: translate(-50%, -50%);
  }
  40% {
    transform: translate(-50%, -60%);
  }
  60% {
    transform: translate(-50%, -45%);
  }
}
`;