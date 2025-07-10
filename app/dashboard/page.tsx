'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';
import { Pie } from 'recharts';

const portfolioData = [
  { month: 'Jan', value: 10000 },
  { month: 'Feb', value: 12000 },
  { month: 'Mar', value: 11500 },
  { month: 'Apr', value: 13800 },
  { month: 'May', value: 15200 },
  { month: 'Jun', value: 16500 },
];

const pieData = [
  { name: 'Stocks', value: 45, color: '#3B82F6' },
  { name: 'Bonds', value: 25, color: '#10B981' },
  { name: 'ETFs', value: 20, color: '#F59E0B' },
  { name: 'Crypto', value: 10, color: '#EF4444' },
];

const investments = [
  {
    id: 1,
    name: 'Apple Inc.',
    symbol: 'AAPL',
    shares: 50,
    currentPrice: 175.20,
    change: 2.5,
    changePercent: 1.45,
    value: 8760,
    category: 'Technology'
  },
  {
    id: 2,
    name: 'Microsoft Corporation',
    symbol: 'MSFT',
    shares: 30,
    currentPrice: 310.50,
    change: -3.2,
    changePercent: -1.02,
    value: 9315,
    category: 'Technology'
  },
  {
    id: 3,
    name: 'Tesla Inc.',
    symbol: 'TSLA',
    shares: 25,
    currentPrice: 220.15,
    change: 5.8,
    changePercent: 2.71,
    value: 5504,
    category: 'Automotive'
  },
  {
    id: 4,
    name: 'Amazon.com Inc.',
    symbol: 'AMZN',
    shares: 15,
    currentPrice: 145.30,
    change: -1.5,
    changePercent: -1.02,
    value: 2180,
    category: 'E-commerce'
  },
];

const recentActivity = [
  { type: 'buy', symbol: 'AAPL', shares: 10, price: 175.20, date: '2024-01-15' },
  { type: 'sell', symbol: 'GOOGL', shares: 5, price: 142.80, date: '2024-01-14' },
  { type: 'buy', symbol: 'TSLA', shares: 15, price: 220.15, date: '2024-01-13' },
  { type: 'dividend', symbol: 'MSFT', amount: 68.50, date: '2024-01-12' },
];

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0);
  const totalChange = investments.reduce((sum, inv) => sum + (inv.change * inv.shares), 0);
  const totalChangePercent = (totalChange / totalValue) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Investment Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Investment
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Change</CardTitle>
                {totalChange >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                )}
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(totalChange).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}% today
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{investments.length}</div>
                <p className="text-xs text-muted-foreground">
                  Across {new Set(investments.map(inv => inv.category)).size} categories
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <Progress value={68} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  $32,000 to goal
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Portfolio Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>Your portfolio value over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        dot={{ fill: '#3B82F6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Asset Allocation */}
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Your investment distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {pieData.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm">{entry.name}</span>
                        </div>
                        <span className="text-sm font-medium">{entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest investment activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === 'buy' ? 'bg-green-100 text-green-600' :
                          activity.type === 'sell' ? 'bg-red-100 text-red-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {activity.type === 'buy' ? <TrendingUp className="h-4 w-4" /> :
                           activity.type === 'sell' ? <TrendingDown className="h-4 w-4" /> :
                           <DollarSign className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">
                            {activity.type === 'buy' ? 'Bought' : 
                             activity.type === 'sell' ? 'Sold' : 'Dividend from'} {activity.symbol}
                          </p>
                          <p className="text-sm text-gray-600">
                            {activity.shares && `${activity.shares} shares at $${activity.price}`}
                            {activity.amount && `$${activity.amount} received`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Investments</CardTitle>
                <CardDescription>Manage your current investment portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <motion.div
                      key={investment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                          {investment.symbol.substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{investment.name}</h3>
                          <p className="text-sm text-gray-600">{investment.symbol} • {investment.shares} shares</p>
                          <Badge variant="secondary">{investment.category}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${investment.value.toLocaleString()}</p>
                        <p className={`text-sm ${investment.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {investment.change >= 0 ? '+' : ''}${investment.change.toFixed(2)} ({investment.changePercent.toFixed(2)}%)
                        </p>
                        <p className="text-sm text-gray-600">${investment.currentPrice.toFixed(2)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Analysis</CardTitle>
                  <CardDescription>Your portfolio risk breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Risk Level</span>
                      <Badge variant="outline" className="text-yellow-600">Moderate</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Low Risk</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Medium Risk</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>High Risk</span>
                        <span>10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Annual Return</span>
                      <span className="font-semibold text-green-600">+12.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Volatility</span>
                      <span className="font-semibold">8.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Sharpe Ratio</span>
                      <span className="font-semibold">1.45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Max Drawdown</span>
                      <span className="font-semibold text-red-600">-5.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Complete history of your investment activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === 'buy' ? 'bg-green-100 text-green-600' :
                          activity.type === 'sell' ? 'bg-red-100 text-red-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {activity.type === 'buy' ? <TrendingUp className="h-4 w-4" /> :
                           activity.type === 'sell' ? <TrendingDown className="h-4 w-4" /> :
                           <DollarSign className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium capitalize">{activity.type}</p>
                          <p className="text-sm text-gray-600">{activity.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {activity.shares && `${activity.shares} shares`}
                          {activity.amount && `$${activity.amount}`}
                        </p>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}