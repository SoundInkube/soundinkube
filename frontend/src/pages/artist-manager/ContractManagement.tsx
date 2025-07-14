import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Plus, Edit, Eye, Download, Calendar, DollarSign, AlertTriangle } from 'lucide-react';

interface Contract {
  id: string;
  artistName: string;
  type: 'management' | 'recording' | 'publishing' | 'touring' | 'endorsement';
  status: 'active' | 'pending' | 'expired' | 'terminated';
  startDate: string;
  endDate: string;
  value: number;
  commission: number;
  terms: string;
  renewalDate?: string;
  documents: string[];
}

const mockContracts: Contract[] = [
  {
    id: '1',
    artistName: 'Maya Chen',
    type: 'management',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    value: 125000,
    commission: 15,
    terms: 'Exclusive management agreement with performance bonuses',
    renewalDate: '2024-11-15',
    documents: ['management_agreement.pdf', 'performance_clauses.pdf']
  },
  {
    id: '2',
    artistName: 'DJ Nexus',
    type: 'recording',
    status: 'active',
    startDate: '2024-03-01',
    endDate: '2026-03-01',
    value: 85000,
    commission: 20,
    terms: '3-album deal with promotional support',
    documents: ['recording_contract.pdf', 'royalty_agreement.pdf']
  },
  {
    id: '3',
    artistName: 'Sarah Williams',
    type: 'touring',
    status: 'pending',
    startDate: '2024-08-01',
    endDate: '2024-12-31',
    value: 45000,
    commission: 12,
    terms: 'Summer tour management and booking',
    documents: ['tour_agreement.pdf']
  },
  {
    id: '4',
    artistName: 'Maya Chen',
    type: 'endorsement',
    status: 'expired',
    startDate: '2023-06-01',
    endDate: '2024-06-01',
    value: 25000,
    commission: 10,
    terms: 'Guitar endorsement deal with social media requirements',
    documents: ['endorsement_contract.pdf']
  }
];

export default function ContractManagement() {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-600';
      case 'pending': return 'bg-netflix-red';
      case 'expired': return 'bg-red-600';
      case 'terminated': return 'bg-netflix-dark';
      default: return 'bg-netflix-dark';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'management': return '👥';
      case 'recording': return '🎵';
      case 'publishing': return '📚';
      case 'touring': return '🎪';
      case 'endorsement': return '⭐';
      default: return '📄';
    }
  };

  const filteredContracts = contracts.filter(contract => {
    if (filterStatus !== 'all' && contract.status !== filterStatus) return false;
    if (filterType !== 'all' && contract.type !== filterType) return false;
    return true;
  });

  const expiringContracts = contracts.filter(contract => {
    const endDate = new Date(contract.endDate);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return endDate <= thirtyDaysFromNow && contract.status === 'active';
  });

  return (
    <div className="text-white container mx-auto p-6 space-y-6">
      <div className="text-white flex justify-between items-center">
        <div>
          <h1 className="text-white text-3xl font-bold text-white">Contract Management</h1>
          <p className="text-white text-white mt-2">Manage all artist contracts and agreements</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="text-white bg-red-600 hover:bg-purple-700">
              <Plus className="text-white h-4 w-4 mr-2" />
              New Contract
            </Button>
          </DialogTrigger>
          <DialogContent className="text-white bg-netflix-dark border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-white">Create New Contract</DialogTitle>
              <DialogDescription className="text-white text-white">
                Set up a new contract agreement with an artist
              </DialogDescription>
            </DialogHeader>
            <div className="text-white grid grid-cols-2 gap-4 py-4">
              <div className="text-white space-y-2">
                <Label htmlFor="artist" className="text-white text-white">Artist Name</Label>
                <Input id="artist" placeholder="Select artist" className="text-white bg-netflix-dark border-gray-600 text-white" />
              </div>
              <div className="text-white space-y-2">
                <Label htmlFor="type" className="text-white text-white">Contract Type</Label>
                <Select>
                  <SelectTrigger className="text-white bg-netflix-dark border-gray-600 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="text-white bg-netflix-dark border-gray-600">
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="recording">Recording</SelectItem>
                    <SelectItem value="publishing">Publishing</SelectItem>
                    <SelectItem value="touring">Touring</SelectItem>
                    <SelectItem value="endorsement">Endorsement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-white space-y-2">
                <Label htmlFor="start-date" className="text-white text-white">Start Date</Label>
                <Input id="start-date" type="date" className="text-white bg-netflix-dark border-gray-600 text-white" />
              </div>
              <div className="text-white space-y-2">
                <Label htmlFor="end-date" className="text-white text-white">End Date</Label>
                <Input id="end-date" type="date" className="text-white bg-netflix-dark border-gray-600 text-white" />
              </div>
              <div className="text-white space-y-2">
                <Label htmlFor="value" className="text-white text-white">Contract Value</Label>
                <Input id="value" type="number" placeholder="0" className="text-white bg-netflix-dark border-gray-600 text-white" />
              </div>
              <div className="text-white space-y-2">
                <Label htmlFor="commission" className="text-white text-white">Commission (%)</Label>
                <Input id="commission" type="number" placeholder="15" className="text-white bg-netflix-dark border-gray-600 text-white" />
              </div>
              <div className="text-white col-span-2 space-y-2">
                <Label htmlFor="terms" className="text-white text-white">Contract Terms</Label>
                <Textarea id="terms" placeholder="Enter contract terms and conditions" className="text-white bg-netflix-dark border-gray-600 text-white" />
              </div>
            </div>
            <div className="text-white flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} className="text-white border-gray-600 text-white">
                Cancel
              </Button>
              <Button className="text-white bg-red-600 hover:bg-purple-700">
                Create Contract
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Expiring Contracts Alert */}
      {expiringContracts.length > 0 && (
        <Card className="text-white bg-netflix-red/20 border-yellow-600">
          <CardHeader>
            <CardTitle className="text-white text-netflix-red flex items-center">
              <AlertTriangle className="text-white h-5 w-5 mr-2" />
              Contracts Expiring Soon
            </CardTitle>
            <CardDescription className="text-white text-netflix-red">
              {expiringContracts.length} contract(s) will expire within 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-white space-y-2">
              {expiringContracts.map((contract) => (
                <div key={contract.id} className="text-white flex justify-between items-center p-2 bg-netflix-red/20 rounded">
                  <span className="text-white text-white">{contract.artistName} - {contract.type}</span>
                  <span className="text-white text-netflix-red">{contract.endDate}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="text-white flex gap-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="text-white w-48 bg-netflix-dark border-gray-600 text-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="text-white bg-netflix-dark border-gray-600">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="terminated">Terminated</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="text-white w-48 bg-netflix-dark border-gray-600 text-white">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="text-white bg-netflix-dark border-gray-600">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="management">Management</SelectItem>
            <SelectItem value="recording">Recording</SelectItem>
            <SelectItem value="publishing">Publishing</SelectItem>
            <SelectItem value="touring">Touring</SelectItem>
            <SelectItem value="endorsement">Endorsement</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contracts List */}
      <div className="text-white grid grid-cols-1 gap-4">
        {filteredContracts.map((contract) => (
          <Card key={contract.id} className="text-white bg-netflix-dark border-gray-700">
            <CardContent className="text-white p-6">
              <div className="text-white flex justify-between items-start">
                <div className="text-white flex-1">
                  <div className="text-white flex items-center gap-3 mb-2">
                    <span className="text-white text-2xl">{getTypeIcon(contract.type)}</span>
                    <div>
                      <h3 className="text-white text-xl font-semibold text-white">{contract.artistName}</h3>
                      <p className="text-white text-white capitalize">{contract.type} Contract</p>
                    </div>
                  </div>

                  <div className="text-white grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-white text-white text-sm">Duration</p>
                      <p className="text-white text-white font-medium">
                        {new Date(contract.startDate).toLocaleDateString()} - {new Date(contract.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-white text-sm">Value</p>
                      <p className="text-white text-white font-medium">${contract.value.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-white text-white text-sm">Commission</p>
                      <p className="text-white text-white font-medium">{contract.commission}%</p>
                    </div>
                    <div>
                      <p className="text-white text-white text-sm">Documents</p>
                      <p className="text-white text-white font-medium">{contract.documents.length} files</p>
                    </div>
                  </div>

                  <div className="text-white mt-4">
                    <p className="text-white text-white text-sm mb-1">Terms</p>
                    <p className="text-white text-white">{contract.terms}</p>
                  </div>
                </div>

                <div className="text-white flex flex-col items-end gap-3">
                  <Badge className={`${getStatusColor(contract.status)} text-white`}>
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                  </Badge>
                  
                  <div className="text-white flex gap-2">
                    <Button size="sm" variant="outline" className="text-white border-gray-600 text-white hover:bg-netflix-dark">
                      <Eye className="text-white h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-white border-gray-600 text-white hover:bg-netflix-dark">
                      <Edit className="text-white h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-white border-gray-600 text-white hover:bg-netflix-dark">
                      <Download className="text-white h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContracts.length === 0 && (
        <Card className="text-white bg-netflix-dark border-gray-700">
          <CardContent className="text-white text-center py-8">
            <FileText className="text-white h-12 w-12 text-white mx-auto mb-4" />
            <p className="text-white text-white">No contracts found matching your filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}