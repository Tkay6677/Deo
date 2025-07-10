'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  DollarSign,
  BarChart3,
  Shield,
  AlertTriangle,
  Target
} from 'lucide-react';

const investments = [
  {
    id: 1,
    name: 'Apple Inc.',
    symbol: 'AAPL',
    price: 175.20,
    change: 2.5,
    changePercent: 1.45,
    marketCap: '2.8T',
    sector: 'Technology',
    risk: 'Medium',
    rating: 4.5,
    roi: 18.5,
    description: 'Leading technology company known for innovative consumer electronics and services.',
    logo: 'AAPL'
  },
  {
    id: 2,
    name: 'Microsoft Corporation',
    symbol: 'MSFT',
    price: 310.50,
    change: -3.2,
    changePercent: -1.02,
    marketCap: '2.3T',
    sector: 'Technology',
    risk: 'Low',
    rating: 4.8,
    roi: 22.1,
    description: 'Global technology company providing software, services, and cloud solutions.',
    logo: 'MSFT'
  },
  {
    id: 3,
    name: 'Tesla Inc.',
    symbol: 'TSLA',
    price: 220.15,
    change: 5.8,
    changePercent: 2.71,
    marketCap: '700B',
    sector: 'Automotive',
    risk: 'High',
    rating: 4.2,
    roi: 35.7,
    description: 'Electric vehicle and clean energy company leading the automotive revolution.',
    logo: 'TSLA'
  },
  {
    id: 4,
    name: 'Amazon.com Inc.',
    symbol: 'AMZN',
    price: 145.30,
    change: -1.5,
    changePercent: -1.02,
    marketCap: '1.5T',
    sector: 'E-commerce',
    risk: 'Medium',
    rating: 4.3,
    roi: 16.8,
    description: 'Leading e-commerce and cloud computing platform with global reach.',
    logo: 'AMZN'
  },
  {
    id: 5,
    name: 'Alphabet Inc.',
    symbol: 'GOOGL',
    price: 142.80,
    change: 1.8,
    changePercent: 1.28,
    marketCap: '1.8T',
    sector: 'Technology',
    risk: 'Medium',
    rating: 4.4,
    roi: 19.3,
    description: 'Technology conglomerate focusing on internet services and artificial intelligence.',
    logo: 'GOOGL'
  },
  {
    id: 6,
    name: 'NVIDIA Corporation',
    symbol: 'NVDA',
    price: 485.60,
    change: 12.4,
    changePercent: 2.62,
    marketCap: '1.2T',
    sector: 'Technology',
    risk: 'High',
    rating: 4.6,
    roi: 45.2,
    description: 'Leading designer of graphics processing units for gaming and professional markets.',
    logo: 'NVDA'
  },
  {
    id: 7,
    name: 'JPMorgan Chase & Co.',
    symbol: 'JPM',
    price: 155.90,
    change: -0.8,
    changePercent: -0.51,
    marketCap: '450B',
    sector: 'Financial',
    risk: 'Medium',
    rating: 4.1,
    roi: 14.7,
    description: 'Leading global financial services firm providing investment banking and asset management.',
    logo: 'JPM'
  },
  {
    id: 8,
    name: 'Johnson & Johnson',
    symbol: 'JNJ',
    price: 162.35,
    change: 0.95,
    changePercent: 0.59,
    marketCap: '430B',
    sector: 'Healthcare',
    risk: 'Low',
    rating: 4.0,
    roi: 12.3,
    description: 'Diversified healthcare company with pharmaceuticals, medical devices, and consumer products.',
    logo: 'JNJ'
  }
];

const sectors = ['All', 'Technology', 'Healthcare', 'Financial', 'Automotive', 'E-commerce'];
const riskLevels = ['All', 'Low', 'Medium', 'High'];

export default function Investments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedRisk, setSelectedRisk] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const filteredInvestments = investments.filter(investment => {
    const matchesSearch = investment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investment.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'All' || investment.sector === selectedSector;
    const matchesRisk = selectedRisk === 'All' || investment.risk === selectedRisk;
    
    return matchesSearch && matchesSector && matchesRisk;
  });

  const sortedInvestments = [...filteredInvestments].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return b.price - a.price;
      case 'change':
        return b.changePercent - a.changePercent;
      case 'roi':
        return b.roi - a.roi;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'Low':
        return <Shield className="h-4 w-4" />;
      case 'Medium':
        return <Target className="h-4 w-4" />;
      case 'High':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Investment Opportunities</h1>
            </div>
            <div className="text-sm text-gray-600">
              {filteredInvestments.length} investments available
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Your Next Investment</CardTitle>
            <CardDescription>
              Filter and search through our curated list of investment opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search investments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                <SelectTrigger>
                  <SelectValue placeholder="Risk level" />
                </SelectTrigger>
                <SelectContent>
                  {riskLevels.map(risk => (
                    <SelectItem key={risk} value={risk}>{risk}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="change">Change</SelectItem>
                  <SelectItem value="roi">ROI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Investment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedInvestments.map((investment, index) => (
            <motion.div
              key={investment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {investment.logo.substring(0, 2)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{investment.name}</CardTitle>
                        <CardDescription>{investment.symbol}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{investment.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">${investment.price.toFixed(2)}</span>
                      <div className={`flex items-center space-x-1 ${
                        investment.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {investment.change >= 0 ? 
                          <TrendingUp className="h-4 w-4" /> : 
                          <TrendingDown className="h-4 w-4" />
                        }
                        <span className="font-medium">
                          {investment.change >= 0 ? '+' : ''}{investment.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{investment.sector}</Badge>
                      <Badge className={getRiskColor(investment.risk)}>
                        {getRiskIcon(investment.risk)}
                        <span className="ml-1">{investment.risk}</span>
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Market Cap</p>
                        <p className="font-semibold">{investment.marketCap}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Expected ROI</p>
                        <p className="font-semibold text-green-600">{investment.roi}%</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {investment.description}
                    </p>
                    
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                                {investment.logo.substring(0, 2)}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold">{investment.name}</h3>
                                <p className="text-sm text-gray-600">{investment.symbol}</p>
                              </div>
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-600">Current Price</p>
                                <p className="text-2xl font-bold">${investment.price.toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">24h Change</p>
                                <p className={`text-xl font-bold ${
                                  investment.change >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {investment.change >= 0 ? '+' : ''}{investment.changePercent.toFixed(2)}%
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Market Cap</p>
                                <p className="text-xl font-bold">{investment.marketCap}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Expected ROI</p>
                                <p className="text-xl font-bold text-green-600">{investment.roi}%</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm text-gray-600 mb-2">About</p>
                              <p className="text-gray-800">{investment.description}</p>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button className="flex-1">
                                <DollarSign className="h-4 w-4 mr-2" />
                                Invest Now
                              </Button>
                              <Button variant="outline">
                                Add to Watchlist
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button className="flex-1">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Invest
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {sortedInvestments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No investments found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}