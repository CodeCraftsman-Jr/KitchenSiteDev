# Kitchen Site Deployment Guide

## 🎯 What We've Enhanced

### Profile Photo Enhancements ✨
- **Staff Photos**: Increased from 20x20 to 32x32 (128px) with cook-themed animations
- **User Avatars**: Increased from 12x12 to 16x16 (64px) with entrance animations
- **Animations Added**:
  - Pan flipping motions
  - Stirring animations
  - Cooking bounce effects
  - Chef wiggle animations
  - Fade-in, scale-in, and slide-in entrance effects
  - Glow pulse effects for enhanced visual appeal

### Animation Features
- **Intersection Observer**: Animations trigger when photos come into view
- **Staggered Delays**: Each photo animates with a slight delay for smooth sequence
- **Random Animation Selection**: Different animations for variety
- **Hover Effects**: Enhanced interactivity with scale and glow effects

## 🚀 Deployment to Netlify

### Step 1: Fix PowerShell Execution Policy (If Needed)
If you encounter npm/npx execution policy errors, run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Step 2: Test Local Build
```bash
# Install dependencies (if not already done)
npm install

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

### Step 3: Deploy to Netlify

#### Option A: Drag & Drop Deployment
1. Run `npm run build` to create the `dist` folder
2. Go to [Netlify](https://netlify.com) and sign up/login
3. Drag the `dist` folder to the Netlify deploy area
4. Your site will be deployed instantly!

#### Option B: Git-based Deployment (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Netlify will automatically use the `netlify.toml` configuration
4. Build settings are already configured:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Step 4: Environment Variables (If Needed)
If your app uses environment variables, add them in Netlify:
1. Go to Site Settings → Environment Variables
2. Add any required variables like:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - etc.

## ✅ Deployment Verification Checklist

### Visual Verification
- [ ] Staff photos are larger (128px) and display cook-themed animations
- [ ] User avatars in reviews are larger (64px) with entrance animations
- [ ] Animations trigger when scrolling photos into view
- [ ] Hover effects work on profile photos
- [ ] All images load correctly
- [ ] Responsive design works on mobile/tablet/desktop

### Functional Verification
- [ ] Home page loads correctly
- [ ] Menu page navigation works
- [ ] All internal links function properly
- [ ] Contact form works (if using EmailJS)
- [ ] No console errors in browser developer tools
- [ ] Site loads quickly (check Lighthouse scores)

### Animation Testing
- [ ] Staff photos animate with cooking motions (pan flip, stir, bounce, wiggle)
- [ ] User avatars have entrance animations (fade-in, scale-in, slide-in)
- [ ] Animations are smooth and not jarring
- [ ] Glow pulse effects enhance visual appeal
- [ ] Staggered animation delays create pleasing sequence

## 🔧 Troubleshooting

### Common Issues
1. **Animations not working**: Check browser compatibility (modern browsers required)
2. **Images not loading**: Verify image paths in production
3. **Routing issues**: Ensure `netlify.toml` redirects are working
4. **Slow loading**: Check network tab for large assets

### Performance Optimization
- Images are optimized with proper caching headers
- CSS/JS files are minified and chunked
- Vendor libraries are separated for better caching
- Assets under 4KB are inlined as base64

## 📱 Mobile Responsiveness
The enhanced profile photos maintain responsiveness:
- Staff photos: 128px on desktop, scales appropriately on mobile
- User avatars: 64px on desktop, scales appropriately on mobile
- Animations are optimized for touch devices

## 🎨 Animation Details

### Staff Photo Animations
- **Pan Flip**: Simulates flipping food in a pan
- **Stir Motion**: Circular stirring motion
- **Cooking Bounce**: Bouncing motion like food cooking
- **Chef Wiggle**: Subtle chef-like movements

### User Avatar Animations
- **Fade In Up**: Slides up while fading in
- **Scale In**: Scales from small to normal size
- **Slide In Left**: Slides in from the left side

All animations include:
- Smooth easing functions
- Appropriate duration (0.6-0.8 seconds)
- Intersection observer for performance
- Fallback for reduced motion preferences
