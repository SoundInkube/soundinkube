import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, FileText, Calendar, AlertTriangle, CheckCircle, Clock, Edit } from 'lucide-react';

interface Contract {
  id: string;
  artistName: string;
  startDate: string;
  endDate: string;
  commissionRate: number;
  status: 'Active' | 'Expiring Soon' | 'Expired' | 'Draft';
  renewalDate: string;
  contractType: string;
  value: number;
}

export default function Contracts() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock contract data
    const mockContracts: Contract[] = [
      {
        id: 'contract-1',
        artistName: 'Sarah Johnson',
        startDate: '2024-01-15',
        endDate: '2025-01-15',
        commissionRate: 15,
        status: 'Active',
        renewalDate: '2024-11-15',
        contractType: 'Management Agreement',
        value: 180000,
      },
      {
        id: 'contract-2',
        artistName: 'Mike Davis',
        startDate: '2024-03-01',
        endDate: '2026-03-01',
        commissionRate: 18,
        status: 'Active',
        renewalDate: '2025-12-01',
        contractType: 'Exclusive Management',
        value: 250000,
      },
      {
        id: 'contract-3',
        artistName: 'Emily Chen',
        startDate: '2023-08-10',
        endDate: '2024-08-10',
        commissionRate: 12,
        status: 'Expiring Soon',
        renewalDate: '2024-06-10',
        contractType: 'Booking Agreement',
        value: 95000,
      },
      {
        id: 'contract-4',
        artistName: 'Alex Rodriguez',
        startDate: '2024-02-20',
        endDate: '2025-02-20',
        commissionRate: 20,
        status: 'Active',
        renewalDate: '2024-12-20',
        contractType: 'Full Service Management',
        value: 120000,
      },
      {
        id: 'contract-5',
        artistName: 'Maya Patel',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
        commissionRate: 15,
        status: 'Expired',
        renewalDate: '2023-10-15',
        contractType: 'Performance Agreement',
        value: 75000,
      },
      {
        id: 'contract-6',
        artistName: 'David Kim',
        startDate: '2024-06-30',
        endDate: '2025-06-30',
        commissionRate: 14,
        status: 'Draft',
        renewalDate: '2025-04-30',
        contractType: 'Recording Agreement',
        value: 110000,
      },
    ];

    setTimeout(() => {
      setContracts(mockContracts);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="netflix-badge-success flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          {status}
        </Badge>;
      case 'Expiring Soon':
        return <Badge className="netflix-badge-warning flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          {status}
        </Badge>;
      case 'Expired':
        return <Badge className="netflix-badge-error flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {status}
        </Badge>;
      case 'Draft':
        return <Badge className="bg-gray-600 text-white flex items-center gap-1">
          <FileText className="h-3 w-3" />
          {status}
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = 
      contract.artistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.contractType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
      contract.status.toLowerCase().replace(' ', '_') === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getContractStats = () => {
    return {
      total: contracts.length,
      active: contracts.filter(c => c.status === 'Active').length,
      expiring: contracts.filter(c => c.status === 'Expiring Soon').length,
      totalValue: contracts.reduce((sum, c) => sum + c.value, 0),
    };
  };

  const stats = getContractStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="netflix-loading"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent mb-2">
            Contract Management
          </h1>
          <p className="text-gray-400 text-lg">
            Manage artist contracts, track renewals, and monitor agreements
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Contracts</CardTitle>
              <FileText className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400">
                Across all artists
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Contracts</CardTitle>
              <CheckCircle className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.active}</div>
              <p className="text-xs text-green-400">
                Currently active
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Expiring Soon</CardTitle>
              <AlertTriangle className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.expiring}</div>
              <p className="text-xs text-yellow-400">
                Need renewal
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Value</CardTitle>
              <Calendar className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalValue.toLocaleString()}</div>
              <p className="text-xs text-gray-400">
                Combined value
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search contracts by artist or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 netflix-input"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 netflix-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button className="netflix-button-primary">
              <Plus className="h-4 w-4 mr-2" />
              New Contract
            </Button>
          </div>
        </div>

        {/* Contracts Table */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="netflix-tabs">
            <TabsTrigger value="all">All Contracts</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
            <TabsTrigger value="renewals">Renewals</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Contract Portfolio</CardTitle>
                <CardDescription className="text-gray-400">
                  Complete overview of all artist contracts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Artist</TableHead>
                      <TableHead className="text-gray-300">Contract Type</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Commission</TableHead>
                      <TableHead className="text-gray-300">Start Date</TableHead>
                      <TableHead className="text-gray-300">End Date</TableHead>
                      <TableHead className="text-gray-300">Value</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContracts.map((contract) => (
                      <TableRow key={contract.id} className="border-gray-700 hover:bg-gray-800/50">
                        <TableCell className="font-medium text-white">
                          {contract.artistName}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {contract.contractType}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(contract.status)}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {contract.commissionRate}%
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {new Date(contract.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {new Date(contract.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-green-400 font-medium">
                          ${contract.value.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="netflix-button-secondary">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="netflix-button-secondary">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Active Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Active contracts view coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expiring">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Expiring Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contracts.filter(c => c.status === 'Expiring Soon').map((contract) => (
                    <div key={contract.id} className="p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">{contract.artistName}</h3>
                          <p className="text-gray-400 text-sm">{contract.contractType}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white">Expires: {new Date(contract.endDate).toLocaleDateString()}</p>
                          <Button size="sm" className="netflix-button-primary mt-2">
                            Renew Contract
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="renewals">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Contract Renewals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Renewal management tools coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}