import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  Upload, 
  X, 
  Plus, 
  DollarSign, 
  Package, 
  MapPin, 
  Camera,
  Star,
  Tag,
  FileText,
  CheckCircle,
  AlertCircle,
  Mic,
  Headphones,
  Music,
  Radio,
  Volume2,
  Keyboard,
  Guitar
} from "lucide-react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    subcategory: "",
    condition: "",
    brand: "",
    model: "",
    location: "",
    tags: [] as string[],
    specifications: {
      weight: "",
      dimensions: "",
      powerRequirements: "",
      connectivity: "",
      warranty: ""
    },
    shipping: {
      localPickup: true,
      shipping: false,
      shippingCost: ""
    },
    images: [] as File[]
  });

  const [currentTag, setCurrentTag] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { 
      id: "microphones", 
      name: "Microphones", 
      icon: Mic,
      subcategories: ["Dynamic", "Condenser", "Ribbon", "USB", "Wireless", "Lavalier"]
    },
    { 
      id: "headphones", 
      name: "Headphones & Monitors", 
      icon: Headphones,
      subcategories: ["Studio Headphones", "Studio Monitors", "In-Ear Monitors", "Mixing Headphones"]
    },
    { 
      id: "instruments", 
      name: "Instruments", 
      icon: Music,
      subcategories: ["Electric Guitars", "Bass Guitars", "Keyboards", "Synthesizers", "Drum Kits", "Acoustic Guitars"]
    },
    { 
      id: "audio-interfaces", 
      name: "Audio Interfaces", 
      icon: Radio,
      subcategories: ["USB Interfaces", "Thunderbolt", "PCIe Cards", "Portable", "Rack Mount"]
    },
    { 
      id: "speakers", 
      name: "Speakers & PA", 
      icon: Volume2,
      subcategories: ["PA Speakers", "Subwoofers", "Line Arrays", "Monitor Speakers", "Bluetooth Speakers"]
    },
    { 
      id: "controllers", 
      name: "Controllers & Keyboards", 
      icon: Keyboard,
      subcategories: ["MIDI Controllers", "DJ Controllers", "Piano Keyboards", "Drum Pads", "Control Surfaces"]
    },
    { 
      id: "guitar-gear", 
      name: "Guitar & Bass Gear", 
      icon: Guitar,
      subcategories: ["Guitar Amps", "Bass Amps", "Effects Pedals", "Guitar Accessories", "Bass Accessories"]
    },
    { 
      id: "recording", 
      name: "Recording Equipment", 
      icon: Radio,
      subcategories: ["Mixing Consoles", "Preamps", "Compressors", "EQs", "Audio Processors", "Cables"]
    }
  ];

  const conditions = [
    { value: "new", label: "New", description: "Brand new, unused item" },
    { value: "like-new", label: "Like New", description: "Minimal use, excellent condition" },
    { value: "excellent", label: "Excellent", description: "Well maintained, minor wear" },
    { value: "very-good", label: "Very Good", description: "Good condition, some wear" },
    { value: "good", label: "Good", description: "Functional, noticeable wear" },
    { value: "fair", label: "Fair", description: "Functional, significant wear" }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...formData.images, ...files].slice(0, 8); // Max 8 images
    setFormData({ ...formData, images: newImages });

    // Create preview URLs
    const newUrls = files.map(file => URL.createObjectURL(file));
    setImageUrls(prev => [...prev, ...newUrls].slice(0, 8));
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setImageUrls(newUrls);
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    setFormData({
      ...formData,
      category: categoryId,
      subcategory: "" // Reset subcategory when category changes
    });
  };

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Here you would normally send the data to your API
    console.log("Product data:", formData);
    
    // Show success message or redirect
    alert("Product listed successfully!");
    setIsSubmitting(false);
  };

  const isFormValid = formData.title && formData.description && formData.price && 
                     formData.category && formData.condition && formData.location;

  return (
    <div className="text-white min-h-screen bg-netflix-black">
      <div className="text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-white mb-8">
          <h1 className="text-white text-3xl font-bold text-white mb-2">List Your Equipment</h1>
          <p className="text-white text-white">Share your music gear with the SoundInkube community</p>
        </div>

        <form onSubmit={handleSubmit} className="text-white space-y-8">
          {/* Basic Information */}
          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-white flex items-center space-x-2">
                <Package className="text-white h-5 w-5 text-netflix-red" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="text-white grid md:grid-cols-2 gap-6">
                <div className="text-white md:col-span-2">
                  <Label htmlFor="title" className="text-white text-white">Product Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Neumann U87 Studio Condenser Microphone"
                    className="text-white bg-netflix-dark border-gray-700 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="brand" className="text-white text-white">Brand</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g., Neumann, Shure, Yamaha"
                    className="text-white bg-netflix-dark border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="model" className="text-white text-white">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g., U87, SM57, HS8"
                    className="text-white bg-netflix-dark border-gray-700 text-white"
                  />
                </div>

                <div className="text-white md:col-span-2">
                  <Label htmlFor="description" className="text-white text-white">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your equipment's condition, included accessories, usage history, and any other relevant details..."
                    className="text-white bg-netflix-dark border-gray-700 text-white min-h-[120px]"
                    required
                  />
                  <p className="text-white text-white text-sm mt-1">{formData.description.length}/1000 characters</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category & Condition */}
          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-white flex items-center space-x-2">
                <Tag className="text-white h-5 w-5 text-netflix-red" />
                <span>Category & Condition</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div>
                <Label className="text-white text-white mb-4 block">Category *</Label>
                <div className="text-white grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategoryChange(category.id)}
                        className={`p-4 rounded-lg border transition-all duration-200 ${
                          formData.category === category.id
                            ? 'border-netflix-red bg-netflix-red/10 text-netflix-red'
                            : 'border-gray-700 bg-netflix-dark/50 text-white hover:border-gray-600'
                        }`}
                      >
                        <IconComponent className="text-white h-6 w-6 mx-auto mb-2" />
                        <p className="text-white text-sm font-medium text-center">{category.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedCategory && (
                <div>
                  <Label className="text-white text-white">Subcategory</Label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="text-white w-full bg-netflix-dark border border-gray-700 text-white rounded-md px-3 py-2 mt-1"
                  >
                    <option value="">Select a subcategory</option>
                    {selectedCategory.subcategories.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <Label className="text-white text-white mb-4 block">Condition *</Label>
                <div className="text-white grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {conditions.map((condition) => (
                    <button
                      key={condition.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, condition: condition.value })}
                      className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                        formData.condition === condition.value
                          ? 'border-netflix-red bg-netflix-red/10'
                          : 'border-gray-700 bg-netflix-dark/50 hover:border-gray-600'
                      }`}
                    >
                      <p className={`font-medium ${
                        formData.condition === condition.value ? 'text-netflix-red' : 'text-white'
                      }`}>
                        {condition.label}
                      </p>
                      <p className="text-white text-white text-sm mt-1">{condition.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-white flex items-center space-x-2">
                <DollarSign className="text-white h-5 w-5 text-netflix-red" />
                <span>Pricing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="text-white grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="price" className="text-white text-white">Selling Price (USD) *</Label>
                  <div className="text-white relative">
                    <DollarSign className="text-white absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      className="text-white bg-netflix-dark border-gray-700 text-white pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="originalPrice" className="text-white text-white">Original Price (Optional)</Label>
                  <div className="text-white relative">
                    <DollarSign className="text-white absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      placeholder="0.00"
                      className="text-white bg-netflix-dark border-gray-700 text-white pl-10"
                    />
                  </div>
                  <p className="text-white text-white text-sm mt-1">Help buyers see the value</p>
                </div>
              </div>

              {formData.price && formData.originalPrice && parseFloat(formData.originalPrice) > parseFloat(formData.price) && (
                <div className="text-white p-4 bg-netflix-red/20 border border-green-800 rounded-lg">
                  <div className="text-white flex items-center space-x-2">
                    <CheckCircle className="text-white h-4 w-4 text-netflix-red" />
                    <span className="text-white text-netflix-red font-medium">
                      {Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice)) * 100)}% savings
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-white flex items-center space-x-2">
                <Camera className="text-white h-5 w-5 text-netflix-red" />
                <span>Photos</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="text-white grid grid-cols-2 md:grid-cols-4 gap-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="text-white relative group">
                    <img
                      src={url}
                      alt={`Product ${index + 1}`}
                      className="text-white w-full h-32 object-cover rounded-lg border border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-white absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="text-white h-3 w-3" />
                    </button>
                    {index === 0 && (
                      <Badge className="text-white absolute bottom-2 left-2 bg-netflix-red text-white">
                        Main
                      </Badge>
                    )}
                  </div>
                ))}

                {formData.images.length < 8 && (
                  <label className="text-white w-full h-32 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-600 transition-colors">
                    <Upload className="text-white h-6 w-6 text-white mb-2" />
                    <span className="text-white text-white text-sm">Add Photo</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-white hidden"
                    />
                  </label>
                )}
              </div>
              
              <div className="text-white text-center">
                <p className="text-white text-white text-sm">
                  Add up to 8 photos. First photo will be the main image.
                </p>
                <p className="text-white text-white text-xs mt-1">
                  Supported formats: JPG, PNG, WebP (max 5MB each)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-white flex items-center space-x-2">
                <FileText className="text-white h-5 w-5 text-netflix-red" />
                <span>Specifications (Optional)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="text-white grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="weight" className="text-white text-white">Weight</Label>
                  <Input
                    id="weight"
                    value={formData.specifications.weight}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: { ...formData.specifications, weight: e.target.value }
                    })}
                    placeholder="e.g., 2.5 lbs, 1.2 kg"
                    className="text-white bg-netflix-dark border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="dimensions" className="text-white text-white">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={formData.specifications.dimensions}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: { ...formData.specifications, dimensions: e.target.value }
                    })}
                    placeholder="e.g., 8.5 x 6.2 x 2.4 inches"
                    className="text-white bg-netflix-dark border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="power" className="text-white text-white">Power Requirements</Label>
                  <Input
                    id="power"
                    value={formData.specifications.powerRequirements}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: { ...formData.specifications, powerRequirements: e.target.value }
                    })}
                    placeholder="e.g., 48V Phantom Power, AC/DC"
                    className="text-white bg-netflix-dark border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="connectivity" className="text-white text-white">Connectivity</Label>
                  <Input
                    id="connectivity"
                    value={formData.specifications.connectivity}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: { ...formData.specifications, connectivity: e.target.value }
                    })}
                    placeholder="e.g., XLR, USB, Bluetooth, 1/4 jack"
                    className="text-white bg-netflix-dark border-gray-700 text-white"
                  />
                </div>

                <div className="text-white md:col-span-2">
                  <Label htmlFor="warranty" className="text-white text-white">Warranty Information</Label>
                  <Input
                    id="warranty"
                    value={formData.specifications.warranty}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: { ...formData.specifications, warranty: e.target.value }
                    })}
                    placeholder="e.g., 2 years remaining, No warranty"
                    className="text-white bg-netflix-dark border-gray-700 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Shipping */}
          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-white flex items-center space-x-2">
                <MapPin className="text-white h-5 w-5 text-netflix-red" />
                <span>Location & Shipping</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div>
                <Label htmlFor="location" className="text-white text-white">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Los Angeles, CA"
                  className="text-white bg-netflix-dark border-gray-700 text-white"
                  required
                />
              </div>

              <div className="text-white space-y-4">
                <Label className="text-white text-white">Delivery Options</Label>
                
                <div className="text-white flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="localPickup"
                    checked={formData.shipping.localPickup}
                    onChange={(e) => setFormData({
                      ...formData,
                      shipping: { ...formData.shipping, localPickup: e.target.checked }
                    })}
                    className="text-white rounded border-gray-700 bg-netflix-dark text-netflix-red focus:ring-netflix-red"
                  />
                  <Label htmlFor="localPickup" className="text-white text-white">Local pickup available</Label>
                </div>

                <div className="text-white flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="shipping"
                    checked={formData.shipping.shipping}
                    onChange={(e) => setFormData({
                      ...formData,
                      shipping: { ...formData.shipping, shipping: e.target.checked }
                    })}
                    className="text-white rounded border-gray-700 bg-netflix-dark text-netflix-red focus:ring-netflix-red"
                  />
                  <Label htmlFor="shipping" className="text-white text-white">Willing to ship</Label>
                </div>

                {formData.shipping.shipping && (
                  <div className="text-white ml-6">
                    <Label htmlFor="shippingCost" className="text-white text-white">Shipping Cost</Label>
                    <div className="text-white relative">
                      <DollarSign className="text-white absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                      <Input
                        id="shippingCost"
                        type="number"
                        value={formData.shipping.shippingCost}
                        onChange={(e) => setFormData({
                          ...formData,
                          shipping: { ...formData.shipping, shippingCost: e.target.value }
                        })}
                        placeholder="0.00 (leave empty for calculated shipping)"
                        className="text-white bg-netflix-dark border-gray-700 text-white pl-10"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-white flex items-center space-x-2">
                <Tag className="text-white h-5 w-5 text-netflix-red" />
                <span>Tags (Optional)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="text-white flex space-x-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tags to help buyers find your item"
                  className="text-white bg-netflix-dark border-gray-700 text-white"
                />
                <Button
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  className="text-white border-gray-700 text-white"
                >
                  <Plus className="text-white h-4 w-4" />
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="text-white flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-white bg-netflix-red/20 text-netflix-red border-netflix-red/30 flex items-center space-x-1"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-white ml-1 hover:text-red-300"
                      >
                        <X className="text-white h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <div className="text-white text-sm text-white">
                <p>Suggested tags: vintage, rare, professional, studio-grade, mint-condition</p>
              </div>
            </CardContent>
          </Card>

          {/* Form Validation & Submit */}
          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-6">
              {!isFormValid && (
                <div className="text-white mb-6 p-4 bg-orange-900/20 border border-orange-800 rounded-lg">
                  <div className="text-white flex items-center space-x-2">
                    <AlertCircle className="text-white h-4 w-4 text-orange-400" />
                    <span className="text-white text-orange-400 font-medium">Please complete all required fields</span>
                  </div>
                  <ul className="text-white text-orange-300 text-sm mt-2 ml-6 list-disc">
                    {!formData.title && <li>Product title is required</li>}
                    {!formData.description && <li>Description is required</li>}
                    {!formData.price && <li>Price is required</li>}
                    {!formData.category && <li>Category is required</li>}
                    {!formData.condition && <li>Condition is required</li>}
                    {!formData.location && <li>Location is required</li>}
                  </ul>
                </div>
              )}

              <div className="text-white flex space-x-4">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="text-white flex-1 netflix-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="text-white animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="text-white h-4 w-4 mr-2" />
                      Publish Listing
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="text-white border-gray-700 text-white"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
              </div>

              <div className="text-white mt-4 text-center text-sm text-white">
                <p>By publishing, you agree to our Terms of Service and Community Guidelines</p>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}