import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { MapPin, Phone, Mail, Globe, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface BusinessFormData {
  businessName: string;
  businessType: 'jampad' | 'music_school';
  description: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  amenities: string[];
  businessHours: Record<string, unknown>;
}

export default function BusinessSetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BusinessFormData>({
    businessName: '',
    businessType: user?.role === 'BUSINESS_JAMPAD' ? 'jampad' : 'music_school',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    amenities: [],
    businessHours: {},
  });

  const amenityOptions = [
    'WiFi', 'Parking', 'Air Conditioning', 'Recording Equipment', 
    'Instruments Available', 'Sound Engineer', '24/7 Access', 
    'Refreshments', 'Lounge Area', 'Multiple Rooms'
  ];

  const handleInputChange = (field: keyof BusinessFormData, value: string | string[] | Record<string, unknown>) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addAmenity = (amenity: string) => {
    if (!formData.amenities.includes(amenity)) {
      handleInputChange('amenities', [...formData.amenities, amenity]);
    }
  };

  const removeAmenity = (amenity: string) => {
    handleInputChange('amenities', formData.amenities.filter(a => a !== amenity));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/business-profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Business profile created successfully!');
        navigate('/business/dashboard');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to create business profile');
      }
    } catch (error) {
      toast.error('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="businessName">Business Name *</Label>
        <Input
          id="businessName"
          value={formData.businessName}
          onChange={(e) => handleInputChange('businessName', e.target.value)}
          placeholder="Enter your business name"
          required
        />
      </div>

      <div>
        <Label htmlFor="businessType">Business Type</Label>
        <Select 
          value={formData.businessType} 
          onValueChange={(value) => handleInputChange('businessType', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jampad">Jam Pad / Recording Studio</SelectItem>
            <SelectItem value="music_school">Music School</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Business Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe your business, services, and what makes you unique..."
          rows={4}
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Business Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="business@example.com"
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="website">Website</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="https://yourbusiness.com"
            className="pl-10"
          />
        </div>
      </div>

      <Separator />

      <div>
        <Label htmlFor="address">Street Address *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="123 Music Street"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Los Angeles"
            required
          />
        </div>

        <div>
          <Label htmlFor="state">State/Province</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            placeholder="California"
          />
        </div>

        <div>
          <Label htmlFor="zipCode">Zip Code *</Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            placeholder="90210"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="country">Country *</Label>
        <Input
          id="country"
          value={formData.country}
          onChange={(e) => handleInputChange('country', e.target.value)}
          placeholder="United States"
          required
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label>Amenities & Features</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Select the amenities and features your business offers
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {amenityOptions.map((amenity) => (
            <Button
              key={amenity}
              type="button"
              variant={formData.amenities.includes(amenity) ? "default" : "outline"}
              size="sm"
              onClick={() => formData.amenities.includes(amenity) ? removeAmenity(amenity) : addAmenity(amenity)}
              className="justify-start"
            >
              {amenity}
            </Button>
          ))}
        </div>

        {formData.amenities.length > 0 && (
          <div className="space-y-2">
            <Label>Selected Amenities:</Label>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((amenity) => (
                <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                  {amenity}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeAmenity(amenity)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Set Up Your Business Profile</h1>
        <p className="text-muted-foreground">
          Create a comprehensive profile to showcase your {formData.businessType === 'jampad' ? 'jam pad' : 'music school'} to potential customers
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {step}
            </div>
            {step < 3 && (
              <div className={`w-16 h-0.5 mx-2 ${
                step < currentStep ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Step {currentStep}: {
              currentStep === 1 ? 'Basic Information' :
              currentStep === 2 ? 'Contact & Location' :
              'Amenities & Features'
            }
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && 'Tell us about your business'}
            {currentStep === 2 && 'How can customers reach and find you?'}
            {currentStep === 3 && 'What do you offer to your customers?'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={
                    (currentStep === 1 && (!formData.businessName || !formData.description)) ||
                    (currentStep === 2 && (!formData.address || !formData.city || !formData.zipCode || !formData.country))
                  }
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating Profile...' : 'Create Business Profile'}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}