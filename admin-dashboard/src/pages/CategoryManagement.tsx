import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

const professionalCategories = [
  { id: 1, name: 'Guitar Instructors', count: 45, status: 'Active', description: 'Teachers specializing in guitar instruction' },
  { id: 2, name: 'Vocal Coaches', count: 32, status: 'Active', description: 'Professional vocal training and coaching' },
  { id: 3, name: 'Piano Teachers', count: 28, status: 'Active', description: 'Piano and keyboard instruction specialists' },
  { id: 4, name: 'Music Producers', count: 24, status: 'Active', description: 'Professional music production services' },
  { id: 5, name: 'Drummers', count: 18, status: 'Active', description: 'Drum instruction and performance' },
  { id: 6, name: 'Violinists', count: 15, status: 'Active', description: 'Violin and string instrument specialists' },
  { id: 7, name: 'Sound Engineers', count: 12, status: 'Active', description: 'Audio engineering and mixing professionals' },
  { id: 8, name: 'Lyricists', count: 10, status: 'Active', description: 'Professional songwriting and lyric creation' },
];

const businessCategories = [
  { id: 1, name: 'Music Schools', count: 15, status: 'Active', description: 'Educational institutions offering music courses' },
  { id: 2, name: 'Recording Studios', count: 8, status: 'Active', description: 'Professional recording and production facilities' },
  { id: 3, name: 'Rehearsal Spaces', count: 12, status: 'Active', description: 'Practice rooms and jampad facilities' },
  { id: 4, name: 'Artist Management', count: 6, status: 'Active', description: 'Professional artist management services' },
  { id: 5, name: 'Record Labels', count: 4, status: 'Active', description: 'Music publishing and distribution companies' },
];

const equipmentCategories = [
  { id: 1, name: 'Guitars', count: 156, status: 'Active', description: 'Acoustic and electric guitars' },
  { id: 2, name: 'Keyboards & Pianos', count: 89, status: 'Active', description: 'Digital and acoustic keyboards, pianos' },
  { id: 3, name: 'Drums & Percussion', count: 67, status: 'Active', description: 'Drum kits and percussion instruments' },
  { id: 4, name: 'Audio Equipment', count: 134, status: 'Active', description: 'Microphones, speakers, mixers, interfaces' },
  { id: 5, name: 'Amplifiers', count: 45, status: 'Active', description: 'Guitar and bass amplifiers' },
  { id: 6, name: 'String Instruments', count: 34, status: 'Active', description: 'Violins, cellos, basses' },
];

export default function CategoryManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');

  const handleAddCategory = () => {
    // Add category logic here
    setIsDialogOpen(false);
    setNewCategoryName('');
    setNewCategoryDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Category Management</h1>
          <p className="text-muted-foreground">
            Manage professional, business, and equipment categories
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new category for the platform
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddCategory}>
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="professionals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="professionals">Music Professionals</TabsTrigger>
          <TabsTrigger value="businesses">Businesses</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>

        <TabsContent value="professionals">
          <Card>
            <CardHeader>
              <CardTitle>Music Professional Categories</CardTitle>
              <CardDescription>
                Manage categories for music professionals and service providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search categories..."
                    className="pl-10"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {professionalCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                      <TableCell>{category.count}</TableCell>
                      <TableCell>
                        <Badge variant="default">{category.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="businesses">
          <Card>
            <CardHeader>
              <CardTitle>Business Categories</CardTitle>
              <CardDescription>
                Manage categories for music-related businesses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search categories..."
                    className="pl-10"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {businessCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                      <TableCell>{category.count}</TableCell>
                      <TableCell>
                        <Badge variant="default">{category.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="equipment">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Categories</CardTitle>
              <CardDescription>
                Manage categories for marketplace equipment and instruments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search categories..."
                    className="pl-10"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipmentCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                      <TableCell>{category.count}</TableCell>
                      <TableCell>
                        <Badge variant="default">{category.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
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
      </Tabs>
    </div>
  );
}