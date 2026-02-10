import { useState } from "react";
import { MessageSquare, ThumbsUp, MessageCircle, Share, User, Calendar, TrendingUp, Users, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "General",
    tags: ""
  });

  const categories = [
    { id: "all", label: "All Posts", count: 156 },
    { id: "crop-advice", label: "Crop Advice", count: 45 },
    { id: "pest-control", label: "Pest Control", count: 32 },
    { id: "equipment", label: "Equipment", count: 28 },
    { id: "market-tips", label: "Market Tips", count: 23 },
    { id: "sustainable", label: "Sustainable Farming", count: 18 },
    { id: "general", label: "General Discussion", count: 10 }
  ];

  const posts = [
    {
      id: 1,
      title: "Best practices for tomato cultivation in Maharashtra",
      content: "I've been growing tomatoes for 5 years and have some tips to share about soil preparation, irrigation, and pest management...",
      author: "Rajesh Kumar",
      avatar: "/api/placeholder/32/32",
      category: "Crop Advice",
      tags: ["Tomatoes", "Maharashtra", "Soil Health"],
      likes: 24,
      comments: 8,
      shares: 3,
      timeAgo: "2 hours ago",
      isLiked: false,
      isFollowing: true
    },
    {
      id: 2,
      title: "Organic pest control methods that actually work",
      content: "After trying various chemical pesticides, I switched to organic methods. Here are the most effective ones I've found...",
      author: "Priya Sharma",
      avatar: "/api/placeholder/32/32",
      category: "Pest Control",
      tags: ["Organic", "Pest Control", "Sustainable"],
      likes: 31,
      comments: 12,
      shares: 7,
      timeAgo: "4 hours ago",
      isLiked: true,
      isFollowing: false
    },
    {
      id: 3,
      title: "Market prices for wheat are rising - what do you think?",
      content: "I've noticed wheat prices have increased by 15% in the last week. Is this a good time to sell stored grain?",
      author: "Amit Patel",
      avatar: "/api/placeholder/32/32",
      category: "Market Tips",
      tags: ["Wheat", "Market Prices", "Trading"],
      likes: 18,
      comments: 15,
      shares: 5,
      timeAgo: "6 hours ago",
      isLiked: false,
      isFollowing: false
    },
    {
      id: 4,
      title: "Solar irrigation pumps - worth the investment?",
      content: "I'm considering switching to solar-powered irrigation pumps. Has anyone made this transition? What's the ROI?",
      author: "Sunita Desai",
      avatar: "/api/placeholder/32/32",
      category: "Equipment",
      tags: ["Solar", "Irrigation", "Investment"],
      likes: 22,
      comments: 9,
      shares: 4,
      timeAgo: "1 day ago",
      isLiked: true,
      isFollowing: true
    }
  ];

  const experts = [
    {
      id: 1,
      name: "Dr. Ramesh Gupta",
      specialty: "Soil Science",
      experience: "15 years",
      rating: 4.9,
      consultations: 234,
      avatar: "/api/placeholder/40/40",
      available: true
    },
    {
      id: 2,
      name: "Prof. Meera Singh",
      specialty: "Crop Pathology",
      experience: "12 years",
      rating: 4.8,
      consultations: 189,
      avatar: "/api/placeholder/40/40",
      available: false
    },
    {
      id: 3,
      name: "Mr. Vijay Kumar",
      specialty: "Agricultural Economics",
      experience: "20 years",
      rating: 4.7,
      consultations: 156,
      avatar: "/api/placeholder/40/40",
      available: true
    }
  ];

  const successStories = [
    {
      id: 1,
      farmer: "Suresh Reddy",
      title: "From 2 to 15 acres through smart farming",
      summary: "Started with traditional methods, now uses precision farming to manage 15 acres profitably.",
      improvement: "+300% yield increase",
      image: "/api/placeholder/200/150",
      likes: 45
    },
    {
      id: 2,
      farmer: "Kavita Joshi",
      title: "Organic farming success story",
      summary: "Transitioned to organic farming and now exports to international markets.",
      improvement: "Premium pricing +40%",
      image: "/api/placeholder/200/150",
      likes: 38
    }
  ];

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // In a real app, this would save to backend
    toast.success("Post created successfully!");
    setIsCreatePostOpen(false);
    setNewPost({
      title: "",
      content: "",
      category: "General",
      tags: ""
    });
  };

  const handleLike = (postId: number) => {
    // In a real app, this would update the like count
    toast.success("Post liked!");
  };

  const handleFollow = (postId: number) => {
    // In a real app, this would follow/unfollow the user
    toast.success("User followed!");
  };

  const filteredPosts = selectedCategory === "all"
    ? posts
    : posts.filter(post => post.category.toLowerCase().replace(" ", "-") === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Forum</h1>
          <p className="text-muted-foreground">Connect with fellow farmers and share knowledge</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter your post title"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2 border border-border rounded-md"
                  >
                    <option value="General">General Discussion</option>
                    <option value="Crop Advice">Crop Advice</option>
                    <option value="Pest Control">Pest Control</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Market Tips">Market Tips</option>
                    <option value="Sustainable">Sustainable Farming</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Share your thoughts, experiences, or ask questions..."
                    rows={6}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (optional)</Label>
                  <Input
                    id="tags"
                    value={newPost.tags}
                    onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="Add tags separated by commas"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreatePostOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePost}>
                    Post
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">2,847</p>
                <p className="text-sm text-muted-foreground">Active Farmers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">1,256</p>
                <p className="text-sm text-muted-foreground">Total Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-warning/10 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <ThumbsUp className="h-8 w-8 text-warning-foreground" />
              <div>
                <p className="text-2xl font-bold text-warning-foreground">8,934</p>
                <p className="text-sm text-muted-foreground">Likes Given</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-accent-foreground" />
              <div>
                <p className="text-2xl font-bold text-accent-foreground">156</p>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="forum" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forum">Discussion Forum</TabsTrigger>
          <TabsTrigger value="experts">Expert Consultations</TabsTrigger>
          <TabsTrigger value="stories">Success Stories</TabsTrigger>
          <TabsTrigger value="events">Events & Workshops</TabsTrigger>
        </TabsList>

        <TabsContent value="forum" className="space-y-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <span>{category.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="shadow-soft border-border">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">{post.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{post.author}</span>
                            <span>•</span>
                            <span>{post.timeAgo}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                        {!post.isFollowing && (
                          <Button variant="outline" size="sm" onClick={() => handleFollow(post.id)}>
                            Follow
                          </Button>
                        )}
                      </div>

                      <p className="text-muted-foreground">{post.content}</p>

                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center space-x-1 ${
                              post.isLiked ? 'text-primary' : 'text-muted-foreground'
                            }`}
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </Button>

                          <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-muted-foreground">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </Button>

                          <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-muted-foreground">
                            <Share className="h-4 w-4" />
                            <span>{post.shares}</span>
                          </Button>
                        </div>

                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="experts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert) => (
              <Card key={expert.id} className="shadow-soft border-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={expert.avatar} />
                      <AvatarFallback>
                        <User className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{expert.name}</h4>
                      <p className="text-sm text-muted-foreground">{expert.specialty}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={expert.available ? "default" : "secondary"}>
                          {expert.available ? "Available" : "Busy"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{expert.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Rating</span>
                      <span className="font-medium">{expert.rating} ⭐</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Consultations</span>
                      <span className="font-medium">{expert.consultations}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1" disabled={!expert.available}>
                      Book Consultation
                    </Button>
                    <Button variant="outline" size="icon">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {successStories.map((story) => (
              <Card key={story.id} className="shadow-soft border-border overflow-hidden">
                <div className="aspect-video bg-muted">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground text-lg">{story.title}</h4>
                      <p className="text-sm text-muted-foreground">by {story.farmer}</p>
                    </div>
                    <Badge variant="default">{story.improvement}</Badge>
                  </div>

                  <p className="text-muted-foreground mb-4">{story.summary}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">{story.likes} likes</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Read Full Story
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-semibold text-foreground">Organic Farming Workshop</h4>
                    <p className="text-sm text-muted-foreground">Learn sustainable farming techniques</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>Date:</strong> January 25, 2025</p>
                  <p><strong>Time:</strong> 10:00 AM - 4:00 PM</p>
                  <p><strong>Location:</strong> Agricultural College, Nashik</p>
                  <p><strong>Fee:</strong> ₹500 (includes lunch)</p>
                </div>
                <Button className="w-full mt-4">
                  Register Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-success/10 to-success/5 border-success/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="h-8 w-8 text-success" />
                  <div>
                    <h4 className="font-semibold text-foreground">Farmers Meetup</h4>
                    <p className="text-sm text-muted-foreground">Network with fellow farmers</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>Date:</strong> February 8, 2025</p>
                  <p><strong>Time:</strong> 2:00 PM - 6:00 PM</p>
                  <p><strong>Location:</strong> Community Center, Pune</p>
                  <p><strong>Fee:</strong> Free</p>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Join Event
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-warning/10 to-warning/5 border-warning/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-warning-foreground" />
                  <div>
                    <h4 className="font-semibold text-foreground">Market Trends Seminar</h4>
                    <p className="text-sm text-muted-foreground">Understand current market dynamics</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>Date:</strong> February 15, 2025</p>
                  <p><strong>Time:</strong> 9:00 AM - 1:00 PM</p>
                  <p><strong>Location:</strong> Online Webinar</p>
                  <p><strong>Fee:</strong> ₹200</p>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Register
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MessageSquare className="h-8 w-8 text-accent-foreground" />
                  <div>
                    <h4 className="font-semibold text-foreground">Q&A Session with Experts</h4>
                    <p className="text-sm text-muted-foreground">Get answers to your farming questions</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>Date:</strong> Every Wednesday</p>
                  <p><strong>Time:</strong> 3:00 PM - 5:00 PM</p>
                  <p><strong>Location:</strong> Online</p>
                  <p><strong>Fee:</strong> Free</p>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Join Next Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
