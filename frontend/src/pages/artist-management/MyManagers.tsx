import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface MyManager {
  id: string;
  managerId: string;
  contractStart?: string;
  contractEnd?: string;
  commissionRate?: number;
  createdAt: string;
  manager: {
    id: string;
    email: string;
    profile: {
      firstName: string;
      lastName: string;
      bio?: string;
      avatar?: string;
      location?: string;
      company?: string;
    };
  };
}

export default function MyManagers() {
  const { user } = useAuth();
  const [managers, setManagers] = useState<MyManager[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'MUSIC_PROFESSIONAL') {
      fetchMyManagers();
    }
  }, [user]);

  const fetchMyManagers = async () => {
    try {
      const response = await fetch('/api/artist-management/my-managers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const managersData = await response.json();
        setManagers(managersData);
      }
    } catch (error) {
      toast.error('Failed to fetch managers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndRelationship = async (relationshipId: string) => {
    if (!confirm('Are you sure you want to end this management relationship?')) {
      return;
    }

    try {
      const response = await fetch(`/api/artist-management/${relationshipId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        toast.success('Management relationship ended successfully');
        fetchMyManagers();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to end relationship');
      }
    } catch (error) {
      toast.error('Network error occurred');
    }
  };

  const isContractActive = (contractEnd?: string) => {
    if (!contractEnd) return true;
    return new Date(contractEnd) > new Date();
  };

  if (user?.role !== 'MUSIC_PROFESSIONAL') {
    return (
      <div className="text-white max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-white text-center">
            <Users className="text-white h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              This page is only accessible to Music Professionals.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-white flex items-center justify-center min-h-[400px]">
        <div className="text-white animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="text-white max-w-6xl mx-auto p-6">
      <div className="text-white mb-8">
        <h1 className="text-white text-3xl font-bold mb-2">My Managers</h1>
        <p className="text-white text-muted-foreground">
          View and manage your artist management relationships
        </p>
      </div>

      {managers.length === 0 ? (
        <Card>
          <CardContent className="text-white text-center py-8">
            <Users className="text-white h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-white text-lg font-semibold mb-2">No Managers Yet</h3>
            <p className="text-white text-muted-foreground mb-4">
              You don't have any artist managers yet. When managers send you requests, they'll appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-6">
          {managers.map((managerRelation) => (
            <Card key={managerRelation.id}>
              <CardContent className="text-white p-6">
                <div className="text-white flex items-start gap-4">
                  <Avatar className="text-white h-12 w-12">
                    <AvatarImage src={managerRelation.manager.profile.avatar} />
                    <AvatarFallback>
                      {managerRelation.manager.profile.firstName[0]}
                      {managerRelation.manager.profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-white flex-1">
                    <div className="text-white flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold">
                          {managerRelation.manager.profile.firstName} {managerRelation.manager.profile.lastName}
                        </h3>
                        
                        {managerRelation.manager.profile.company && (
                          <p className="text-white text-sm text-muted-foreground">
                            {managerRelation.manager.profile.company}
                          </p>
                        )}
                      </div>
                      
                      <Badge 
                        variant={isContractActive(managerRelation.contractEnd) ? "default" : "secondary"}
                        className="text-white ml-2"
                      >
                        {isContractActive(managerRelation.contractEnd) ? (
                          <>
                            <CheckCircle className="text-white h-3 w-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <AlertCircle className="text-white h-3 w-3 mr-1" />
                            Expired
                          </>
                        )}
                      </Badge>
                    </div>
                    
                    <div className="text-white mt-3 space-y-1 text-sm text-muted-foreground">
                      <div className="text-white flex items-center gap-1">
                        <Mail className="text-white h-3 w-3" />
                        <span>{managerRelation.manager.email}</span>
                      </div>
                      
                      {managerRelation.manager.profile.location && (
                        <div className="text-white flex items-center gap-1">
                          <MapPin className="text-white h-3 w-3" />
                          <span>{managerRelation.manager.profile.location}</span>
                        </div>
                      )}
                      
                      {managerRelation.commissionRate && (
                        <div className="text-white flex items-center gap-1">
                          <DollarSign className="text-white h-3 w-3" />
                          <span>{managerRelation.commissionRate}% commission rate</span>
                        </div>
                      )}
                      
                      <div className="text-white flex items-center gap-1">
                        <Calendar className="text-white h-3 w-3" />
                        <span>Partnership since {new Date(managerRelation.createdAt).toLocaleDateString()}</span>
                      </div>
                      
                      {managerRelation.contractEnd && (
                        <div className="text-white flex items-center gap-1">
                          <Calendar className="text-white h-3 w-3" />
                          <span>
                            Contract {isContractActive(managerRelation.contractEnd) ? 'ends' : 'ended'} on{' '}
                            {new Date(managerRelation.contractEnd).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {managerRelation.manager.profile.bio && (
                      <div className="text-white mt-3">
                        <p className="text-white text-sm text-muted-foreground">
                          {managerRelation.manager.profile.bio.substring(0, 100)}
                          {managerRelation.manager.profile.bio.length > 100 && '...'}
                        </p>
                      </div>
                    )}
                    
                    <div className="text-white mt-4 flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="text-white text-red-600 hover:text-red-700">
                            <X className="text-white h-3 w-3 mr-1" />
                            End Partnership
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>End Management Partnership</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to end your partnership with{' '}
                              {managerRelation.manager.profile.firstName} {managerRelation.manager.profile.lastName}?
                              This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="text-white flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleEndRelationship(managerRelation.id)}
                            >
                              End Partnership
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}