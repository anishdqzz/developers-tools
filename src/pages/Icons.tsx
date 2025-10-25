import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  Home, User, Settings, Search, Heart, Star, Mail, Phone, Calendar, 
  Clock, MapPin, Camera, Image, Video, Music, File, Folder, Download,
  Upload, Trash, Edit, Save, Copy, Check, X, Plus, Minus, ChevronRight,
  ChevronLeft, ChevronUp, ChevronDown, ArrowRight, ArrowLeft, ArrowUp,
  ArrowDown, Menu, MoreVertical, MoreHorizontal, Filter, Share, Link,
  Eye, EyeOff, Lock, Unlock, Key, Shield, AlertCircle, Info, HelpCircle,
  Bell, BellOff, MessageCircle, Send, Paperclip, Smile, ThumbsUp, ThumbsDown,
  Flag, Bookmark, Tag, Hash, AtSign, DollarSign, Percent, Code, Terminal,
  Database, Server, Cloud, CloudOff, Wifi, WifiOff, Battery, BatteryCharging,
  Bluetooth, Radio, Cast, Monitor, Smartphone, Tablet, Watch, Headphones,
  Mic, MicOff, Volume, Volume1, Volume2, VolumeX, Play, Pause, SkipBack,
  SkipForward, Rewind, FastForward, Repeat, Shuffle, List, Grid, Layers,
  Package, Box, ShoppingCart, ShoppingBag, CreditCard, Wallet, Gift, Award,
  Trophy, Target, Zap, Flame, Droplet, Sun, Moon, Cloud as CloudIcon, Wind,
  Umbrella, Snowflake, Coffee, Pizza, Beer, Wine, Utensils, Apple,
  Activity, TrendingUp, TrendingDown, BarChart, PieChart, LineChart, Globe,
  Navigation2, Compass, Map, Plane, Car, Bike, Bus, Train, Truck,
  Rocket, Satellite, Building, Building2, Store, Warehouse, Factory, School,
  Hospital, Church, Hotel, Trees, Mountain, Waves, Feather, Bug, Anchor,
  Facebook, Instagram, Twitter, Linkedin, Youtube, Github
} from "lucide-react";
import { toast } from "sonner";
import React from "react";

const Icons = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const icons = [
    { name: "Home", icon: Home },
    { name: "User", icon: User },
    { name: "Settings", icon: Settings },
    { name: "Search", icon: Search },
    { name: "Heart", icon: Heart },
    { name: "Star", icon: Star },
    { name: "Mail", icon: Mail },
    { name: "Phone", icon: Phone },
    { name: "Calendar", icon: Calendar },
    { name: "Clock", icon: Clock },
    { name: "MapPin", icon: MapPin },
    { name: "Camera", icon: Camera },
    { name: "Image", icon: Image },
    { name: "Video", icon: Video },
    { name: "Music", icon: Music },
    { name: "File", icon: File },
    { name: "Folder", icon: Folder },
    { name: "Download", icon: Download },
    { name: "Upload", icon: Upload },
    { name: "Trash", icon: Trash },
    { name: "Edit", icon: Edit },
    { name: "Save", icon: Save },
    { name: "Copy", icon: Copy },
    { name: "Check", icon: Check },
    { name: "X", icon: X },
    { name: "Plus", icon: Plus },
    { name: "Minus", icon: Minus },
    { name: "ChevronRight", icon: ChevronRight },
    { name: "ChevronLeft", icon: ChevronLeft },
    { name: "ChevronUp", icon: ChevronUp },
    { name: "ChevronDown", icon: ChevronDown },
    { name: "ArrowRight", icon: ArrowRight },
    { name: "ArrowLeft", icon: ArrowLeft },
    { name: "ArrowUp", icon: ArrowUp },
    { name: "ArrowDown", icon: ArrowDown },
    { name: "Menu", icon: Menu },
    { name: "MoreVertical", icon: MoreVertical },
    { name: "MoreHorizontal", icon: MoreHorizontal },
    { name: "Filter", icon: Filter },
    { name: "Share", icon: Share },
    { name: "Link", icon: Link },
    { name: "Eye", icon: Eye },
    { name: "EyeOff", icon: EyeOff },
    { name: "Lock", icon: Lock },
    { name: "Unlock", icon: Unlock },
    { name: "Key", icon: Key },
    { name: "Shield", icon: Shield },
    { name: "AlertCircle", icon: AlertCircle },
    { name: "Info", icon: Info },
    { name: "HelpCircle", icon: HelpCircle },
    { name: "Bell", icon: Bell },
    { name: "BellOff", icon: BellOff },
    { name: "MessageCircle", icon: MessageCircle },
    { name: "Send", icon: Send },
    { name: "Paperclip", icon: Paperclip },
    { name: "Smile", icon: Smile },
    { name: "ThumbsUp", icon: ThumbsUp },
    { name: "ThumbsDown", icon: ThumbsDown },
    { name: "Flag", icon: Flag },
    { name: "Bookmark", icon: Bookmark },
    { name: "Tag", icon: Tag },
    { name: "Hash", icon: Hash },
    { name: "AtSign", icon: AtSign },
    { name: "DollarSign", icon: DollarSign },
    { name: "Percent", icon: Percent },
    { name: "Code", icon: Code },
    { name: "Terminal", icon: Terminal },
    { name: "Database", icon: Database },
    { name: "Server", icon: Server },
    { name: "Cloud", icon: Cloud },
    { name: "CloudOff", icon: CloudOff },
    { name: "Wifi", icon: Wifi },
    { name: "WifiOff", icon: WifiOff },
    { name: "Battery", icon: Battery },
    { name: "BatteryCharging", icon: BatteryCharging },
    { name: "Bluetooth", icon: Bluetooth },
    { name: "Radio", icon: Radio },
    { name: "Cast", icon: Cast },
    { name: "Monitor", icon: Monitor },
    { name: "Smartphone", icon: Smartphone },
    { name: "Tablet", icon: Tablet },
    { name: "Watch", icon: Watch },
    { name: "Headphones", icon: Headphones },
    { name: "Mic", icon: Mic },
    { name: "MicOff", icon: MicOff },
    { name: "Volume", icon: Volume },
    { name: "Volume1", icon: Volume1 },
    { name: "Volume2", icon: Volume2 },
    { name: "VolumeX", icon: VolumeX },
    { name: "Play", icon: Play },
    { name: "Pause", icon: Pause },
    { name: "SkipBack", icon: SkipBack },
    { name: "SkipForward", icon: SkipForward },
    { name: "Rewind", icon: Rewind },
    { name: "FastForward", icon: FastForward },
    { name: "Repeat", icon: Repeat },
    { name: "Shuffle", icon: Shuffle },
    { name: "List", icon: List },
    { name: "Grid", icon: Grid },
    { name: "Layers", icon: Layers },
    { name: "Package", icon: Package },
    { name: "Box", icon: Box },
    { name: "ShoppingCart", icon: ShoppingCart },
    { name: "ShoppingBag", icon: ShoppingBag },
    { name: "CreditCard", icon: CreditCard },
    { name: "Wallet", icon: Wallet },
    { name: "Gift", icon: Gift },
    { name: "Award", icon: Award },
    { name: "Trophy", icon: Trophy },
    { name: "Target", icon: Target },
    { name: "Zap", icon: Zap },
    { name: "Flame", icon: Flame },
    { name: "Droplet", icon: Droplet },
    { name: "Sun", icon: Sun },
    { name: "Moon", icon: Moon },
    { name: "CloudIcon", icon: CloudIcon },
    { name: "Wind", icon: Wind },
    { name: "Umbrella", icon: Umbrella },
    { name: "Snowflake", icon: Snowflake },
    { name: "Coffee", icon: Coffee },
    { name: "Pizza", icon: Pizza },
    { name: "Beer", icon: Beer },
    { name: "Wine", icon: Wine },
    { name: "Utensils", icon: Utensils },
    { name: "Apple", icon: Apple },
    { name: "Activity", icon: Activity },
    { name: "TrendingUp", icon: TrendingUp },
    { name: "TrendingDown", icon: TrendingDown },
    { name: "BarChart", icon: BarChart },
    { name: "PieChart", icon: PieChart },
    { name: "LineChart", icon: LineChart },
    { name: "Globe", icon: Globe },
    { name: "Navigation2", icon: Navigation2 },
    { name: "Compass", icon: Compass },
    { name: "Map", icon: Map },
    { name: "Plane", icon: Plane },
    { name: "Car", icon: Car },
    { name: "Bike", icon: Bike },
    { name: "Bus", icon: Bus },
    { name: "Train", icon: Train },
    { name: "Truck", icon: Truck },
    { name: "Rocket", icon: Rocket },
    { name: "Satellite", icon: Satellite },
    { name: "Building", icon: Building },
    { name: "Building2", icon: Building2 },
    { name: "Store", icon: Store },
    { name: "Warehouse", icon: Warehouse },
    { name: "Factory", icon: Factory },
    { name: "School", icon: School },
    { name: "Hospital", icon: Hospital },
    { name: "Church", icon: Church },
    { name: "Hotel", icon: Hotel },
    { name: "Trees", icon: Trees },
    { name: "Mountain", icon: Mountain },
    { name: "Waves", icon: Waves },
    { name: "Feather", icon: Feather },
    { name: "Bug", icon: Bug },
    { name: "Anchor", icon: Anchor },
    { name: "Facebook", icon: Facebook },
    { name: "Instagram", icon: Instagram },
    { name: "Twitter", icon: Twitter },
    { name: "Linkedin", icon: Linkedin },
    { name: "Youtube", icon: Youtube },
    { name: "Github", icon: Github },
  ];

  const filteredIcons = icons.filter(icon =>
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyCode = (event: React.MouseEvent, iconName: string) => {
    event.stopPropagation();
    const card = (event.currentTarget as HTMLElement).closest('.group');
    if (card) {
      const svg = card.querySelector('svg');
      if (svg) {
        const svgClone = svg.cloneNode(true) as SVGElement;
        svgClone.removeAttribute('class');
        svgClone.setAttribute('width', '24');
        svgClone.setAttribute('height', '24');
        const svgCode = svgClone.outerHTML;
        navigator.clipboard.writeText(svgCode);
        toast.success(`Copied ${iconName} as SVG!`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            SVG Icon Library
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Browse and copy {icons.length}+ beautiful Lucide icons as SVG for your HTML projects.
          </p>

          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
          {filteredIcons.map(({ name, icon: Icon }) => (
            <Card
              key={name}
              className="p-4 hover:shadow-lg transition-all cursor-pointer group"
              onClick={(e) => copyCode(e, name)}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-gradient-primary transition-all">
                  <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-mono truncate w-full">{name}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1 h-6 text-xs"
                    onClick={(e) => copyCode(e, name)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy SVG
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredIcons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No icons found matching "{searchTerm}"</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Icons;
