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
        return <Badge className="text-white netflix-badge-success flex items-center gap-1">
          <CheckCircle className="text-white h-3 w-3" />
          {status}
        </Badge>;
      case 'Expiring Soon':
        return <Badge className="text-white netflix-badge-warning flex items-center gap-1">
          <AlertTriangle className="text-white h-3 w-3" />
          {status}
        </Badge>;
      case 'Expired':
        return <Badge className="text-white netflix-badge-error flex items-center gap-1">
          <Clock className="text-white h-3 w-3" />
          {status}
        </Badge>;
      case 'Draft':
        return <Badge className="text-white bg-netflix-dark text-white flex items-center gap-1">
          <FileText className="text-white h-3 w-3" />
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
      <div className="text-white flex items-center justify-center min-h-screen">
        <div className="text-white netflix-loading"></div>
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="text-white max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-white mb-8">
          <h1 className="text-white text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent mb-2">
            Contract Management
          </h1>
          <p className="text-white text-white text-lg">
            Manage artist contracts, track renewals, and monitor agreements
          </p>
        </div>

        {/* Stats Cards */}
        <div className="text-white grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Total Contracts</CardTitle>
              <FileText className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-white text-xs text-white">
                Across all artists
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Active Contracts</CardTitle>
              <CheckCircle className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">{stats.active}</div>
              <p className="text-white text-xs text-netflix-red">
                Currently active
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Expiring Soon</CardTitle>
              <AlertTriangle className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">{stats.expiring}</div>
              <p className="text-white text-xs text-netflix-red">
                Need renewal
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Total Value</CardTitle>
              <Calendar className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">${stats.totalValue.toLocaleString()}</div>
              <p className="text-white text-xs text-white">
                Combined value
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="text-white flex flex-col sm:flex-row gap-4 mb-6">
          <div className="text-white flex-1">
            <div className="text-white relative">
              <Search className="text-white absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
              <Input
                placeholder="Search contracts by artist or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-white pl-10 netflix-input"
              />
            </div>
          </div>
          <div className="text-white flex gap-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="text-white w-40 netflix-input">
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
            <Button className="text-white netflix-button-primary">
              <Plus className="text-white h-4 w-4 mr-2" />
              New Contract
            </Button>
          </div>
        </div>

        {/* Contracts Table */}
        <Tabs defaultValue="all" className="text-white space-y-6">
          <TabsList className="text-white netflix-tabs">
            <TabsTrigger value="all">All Contracts</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
            <TabsTrigger value="renewals">Renewals</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Contract Portfolio</CardTitle>
                <CardDescription className="text-white text-white">
                  Complete overview of all artist contracts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="text-white border-gray-700">
                      <TableHead className="text-white text-white">Artist</TableHead>
                      <TableHead className="text-white text-white">Contract Type</TableHead>
                      <TableHead className="text-white text-white">Status</TableHead>
                      <TableHead className="text-white text-white">Commission</TableHead>
                      <TableHead className="text-white text-white">Start Date</TableHead>
                      <TableHead className="text-white text-white">End Date</TableHead>
                      <TableHead className="text-white text-white">Value</TableHead>
                      <TableHead className="text-white text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContracts.map((contract) => (
                      <TableRow key={contract.id} className="text-white border-gray-700 hover:bg-netflix-dark/50">
                        <TableCell className="text-white font-medium text-white">
                          {contract.artistName}
                        </TableCell>
                        <TableCell className="text-white text-white">
                          {contract.contractType}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(contract.status)}
                        </TableCell>
                        <TableCell className="text-white text-white">
                          {contract.commissionRate}%
                        </TableCell>
                        <TableCell className="text-white text-white">
                          {new Date(contract.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-white text-white">
                          {new Date(contract.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-white text-netflix-red font-medium">
                          ${contract.value.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="text-white flex space-x-2">
                            <Button size="sm" variant="outline" className="text-white netflix-button-secondary">
                              <FileText className="text-white h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-white netflix-button-secondary">
                              <Edit className="text-white h-4 w-4" />
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
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Active Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-white">Active contracts view coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expiring">
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Expiring Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-white space-y-4">
                  {contracts.filter(c => c.status === 'Expiring Soon').map((contract) => (
                    <div key={contract.id} className="text-white p-4 rounded-lg border border-yellow-500/30 bg-netflix-red/5">
                      <div className="text-white flex items-center justify-between">
                        <div>
                          <h3 className="text-white text-white font-medium">{contract.artistName}</h3>
                          <p className="text-white text-white text-sm">{contract.contractType}</p>
                        </div>
                        <div className="text-white text-right">
                          <p className="text-white text-white">Expires: {new Date(contract.endDate).toLocaleDateString()}</p>
                          <Button size="sm" className="text-white netflix-button-primary mt-2">
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
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Contract Renewals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-white">Renewal management tools coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}