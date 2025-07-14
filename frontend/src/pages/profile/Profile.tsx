import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";
import { SocialMediaEditor } from "@/components/profile/SocialMediaEditor";
import { SocialMediaDisplay } from "@/components/profile/SocialMediaDisplay";

interface UserProfile {
  firstName: string;
  lastName: string;
  bio: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  avatarUrl: string | null;
  spotifyUrl?: string;
  youtubeUrl?: string;
  appleMusicUrl?: string;
  soundcloudUrl?: string;
  facebookUrl?: string;
}

export default function Profile() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    bio: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    avatarUrl: null,
    spotifyUrl: "",
    youtubeUrl: "",
    appleMusicUrl: "",
    soundcloudUrl: "",
    facebookUrl: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user profile
    const fetchUserProfile = async () => {
      if (!user || !token) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setProfile({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            bio: data.bio || "",
            phoneNumber: data.phoneNumber || "",
            address: data.address || "",
            city: data.city || "",
            postalCode: data.postalCode || "",
            country: data.country || "",
            avatarUrl: data.avatarUrl || null,
            spotifyUrl: data.spotifyUrl || "",
            youtubeUrl: data.youtubeUrl || "",
            appleMusicUrl: data.appleMusicUrl || "",
            soundcloudUrl: data.soundcloudUrl || "",
            facebookUrl: data.facebookUrl || ""
          });
        } else {
          // If user doesn't have a profile yet, we'll just use empty values
          console.log("No profile found or error fetching profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !token) return;
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          bio: profile.bio,
        }),
      });
      
      if (response.ok) {
        setSuccess("Personal information updated successfully!");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to update profile");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while updating profile");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !token) return;
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phoneNumber: profile.phoneNumber,
          address: profile.address,
          city: profile.city,
          postalCode: profile.postalCode,
          country: profile.country,
        }),
      });
      
      if (response.ok) {
        setSuccess("Contact information updated successfully!");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to update contact information");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while updating contact information");
      console.error("Error updating contact info:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user || !token) return;
    
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should not exceed 5MB");
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    const formData = new FormData();
    formData.append("avatar", file);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfile(prev => ({ ...prev, avatarUrl: data.avatarUrl }));
        setSuccess("Avatar updated successfully!");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to update avatar");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while updating avatar");
      console.error("Error updating avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSocialMedia = async (socialMediaData: any) => {
    if (!user || !token) return;
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile/social-media`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(socialMediaData),
      });
      
      if (response.ok) {
        setProfile(prev => ({ ...prev, ...socialMediaData }));
        setSuccess("Social media profiles updated successfully!");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to update social media profiles");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while updating social media profiles");
      console.error("Error updating social media:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="text-white flex justify-center items-center h-96">
          <p className="text-white text-lg text-white">Please log in to view your profile.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white mb-8">
          <h1 className="text-white text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-white mt-2 text-white">Manage your account details and preferences</p>
        </div>

        {(error || success) && (
          <Alert variant={error ? "destructive" : "default"} className="text-white mb-6">
            {success && (
              <div className="text-white flex items-center">
                <CheckCircle className="text-white h-4 w-4 mr-2" />
                <AlertDescription>{success}</AlertDescription>
              </div>
            )}
            {error && <AlertDescription>{error}</AlertDescription>}
          </Alert>
        )}

        <div className="text-white grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          {/* Profile sidebar */}
          <div className="text-white space-y-6">
            <Card>
              <CardContent className="text-white p-6">
                <div className="text-white flex flex-col items-center text-center">
                  <Avatar className="text-white h-24 w-24 mb-4">
                    {profile.avatarUrl ? (
                      <AvatarImage src={profile.avatarUrl} alt={`${profile.firstName} ${profile.lastName}`} />
                    ) : (
                      <AvatarFallback className="text-white text-2xl">
                        {user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <h2 className="text-white text-xl font-semibold">
                    {profile.firstName ? `${profile.firstName} ${profile.lastName}` : user.email}
                  </h2>
                  <p className="text-white text-sm text-white mt-1">{user.role.replace("_", " ")}</p>

                  <div className="text-white mt-4 w-full">
                    <label
                      htmlFor="avatar-upload"
                      className="text-white cursor-pointer flex justify-center items-center py-2 px-4 text-sm font-medium text-white bg-zinc-900 rounded-md border border-zinc-700 hover:bg-black"
                    >
                      Change Avatar
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="text-white sr-only"
                    />
                  </div>
                </div>

                <div className="text-white mt-6 pt-6 border-t border-zinc-800">
                  <h3 className="text-white text-sm font-medium text-white">Account Details</h3>
                  <dl className="text-white mt-2 space-y-1">
                    <div className="text-white flex justify-between">
                      <dt className="text-white text-sm text-white">Email</dt>
                      <dd className="text-white text-sm font-medium text-white">{user.email}</dd>
                    </div>
                    <div className="text-white flex justify-between">
                      <dt className="text-white text-sm text-white">Role</dt>
                      <dd className="text-white text-sm font-medium text-white">{user.role.replace("_", " ")}</dd>
                    </div>
                    <div className="text-white flex justify-between">
                      <dt className="text-white text-sm text-white">Email verification</dt>
                      <dd className="text-white text-sm font-medium">
                        {user.isEmailVerified ? (
                          <span className="text-white text-red-600">Verified</span>
                        ) : (
                          <span className="text-white text-amber-600">Pending</span>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile settings */}
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="text-white mb-6">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="contact">Contact Details</TabsTrigger>
                {user.role === 'MUSIC_PROFESSIONAL' && (
                  <TabsTrigger value="social">Social Media</TabsTrigger>
                )}
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePersonalInfoSubmit} className="text-white space-y-4">
                      <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-white space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                          />
                        </div>
                        
                        <div className="text-white space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>

                      <div className="text-white space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={profile.bio}
                          onChange={handleInputChange}
                          placeholder="Tell us about yourself..."
                          rows={5}
                        />
                      </div>

                      <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Details</CardTitle>
                    <CardDescription>
                      Update your contact information and address
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactInfoSubmit} className="text-white space-y-4">
                      <div className="text-white space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          value={profile.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div className="text-white space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={profile.address}
                          onChange={handleInputChange}
                          placeholder="Enter your street address"
                        />
                      </div>

                      <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-white space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={profile.city}
                            onChange={handleInputChange}
                            placeholder="Enter your city"
                          />
                        </div>
                        
                        <div className="text-white space-y-2">
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            name="postalCode"
                            value={profile.postalCode}
                            onChange={handleInputChange}
                            placeholder="Enter your postal code"
                          />
                        </div>
                      </div>

                      <div className="text-white space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={profile.country}
                          onChange={handleInputChange}
                          placeholder="Enter your country"
                        />
                      </div>

                      <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {user.role === 'MUSIC_PROFESSIONAL' && (
                <TabsContent value="social">
                  <SocialMediaEditor
                    initialData={{
                      spotifyUrl: profile.spotifyUrl,
                      youtubeUrl: profile.youtubeUrl,
                      appleMusicUrl: profile.appleMusicUrl,
                      soundcloudUrl: profile.soundcloudUrl,
                      facebookUrl: profile.facebookUrl,
                    }}
                    onSave={handleSaveSocialMedia}
                    isLoading={loading}
                  />
                  
                  {/* Preview of current social media links */}
                  <div className="text-white mt-6">
                    <SocialMediaDisplay
                      data={{
                        spotifyUrl: profile.spotifyUrl,
                        youtubeUrl: profile.youtubeUrl,
                        appleMusicUrl: profile.appleMusicUrl,
                        soundcloudUrl: profile.soundcloudUrl,
                        facebookUrl: profile.facebookUrl,
                      }}
                      showTitle={true}
                    />
                  </div>
                </TabsContent>
              )}

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your password and account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="text-white space-y-4">
                      <div className="text-white space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          placeholder="Enter your current password"
                        />
                      </div>

                      <div className="text-white space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter your new password"
                        />
                      </div>

                      <div className="text-white space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your new password"
                        />
                      </div>

                      <Button type="submit">Change Password</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}