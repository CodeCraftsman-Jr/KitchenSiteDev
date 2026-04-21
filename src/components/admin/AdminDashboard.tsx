import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SiteConfigEditor from './SiteConfigEditor';
import MenuItemsEditor from './MenuItemsEditor';
import BlogsEditor from './BlogsEditor';
import ReviewsEditor from './ReviewsEditor';
import MediaLibrary from './MediaLibrary';
import StaffEditor from './StaffEditor';
import GalleryEditor from './GalleryEditor';
import OrdersEditor from './OrdersEditor';
import BookingsEditor from './BookingsEditor';
import SeoPagesEditor from './SeoPagesEditor';
import ContactMessagesEditor from './ContactMessagesEditor';

const AdminDashboard = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <Tabs defaultValue="site_config">
        <TabsList className="mb-8 overflow-x-auto w-full flex-wrap justify-start h-auto p-2">
          <TabsTrigger value="site_config">Site Config</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
          <TabsTrigger value="menu_items">Menu Items</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="contact_messages">Contact Messages</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="seo_pages">SEO Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="site_config">
          <SiteConfigEditor />
        </TabsContent>

        <TabsContent value="media">
          <MediaLibrary />
        </TabsContent>

        <TabsContent value="menu_items">
          <MenuItemsEditor />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersEditor />
        </TabsContent>

        <TabsContent value="bookings">
          <BookingsEditor />
        </TabsContent>

        <TabsContent value="contact_messages">
          <ContactMessagesEditor />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewsEditor />
        </TabsContent>

        <TabsContent value="blogs">
          <BlogsEditor />
        </TabsContent>
        
        <TabsContent value="staff">
          <StaffEditor />
        </TabsContent>
        
        <TabsContent value="gallery">
          <GalleryEditor />
        </TabsContent>

        <TabsContent value="seo_pages">
          <SeoPagesEditor />
        </TabsContent>
        
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
