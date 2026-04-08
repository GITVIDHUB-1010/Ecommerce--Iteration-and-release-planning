const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors({
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
});

const products = [
  // Electronics
  { id: '1', name: 'Sony WH-1000XM5 Headphones', category: 'Electronics', price: 24999, rating: 4.8, reviews: 2341, description: 'Industry-leading noise cancellation with Auto NC Optimizer. Up to 30-hour battery life, multipoint connection, and crystal-clear hands-free calling. Lightweight design at just 250g with ultra-soft ear pads for all-day comfort.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=85', stock: 15, badge: 'Bestseller' },
  { id: '2', name: 'Apple Watch Series 9', category: 'Electronics', price: 41999, rating: 4.9, reviews: 5821, description: 'Advanced health features including blood oxygen sensor, ECG app, and temperature sensing. Always-on Retina display, crash detection, and up to 18 hours battery life. Water resistant to 50 metres.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=85', stock: 10, badge: 'New' },
  { id: '3', name: 'JBL Flip 6 Bluetooth Speaker', category: 'Electronics', price: 8999, rating: 4.6, reviews: 3102, description: 'Powerful JBL Pro Sound with two opposing angled passive radiators for deep bass. IP67 waterproof and dustproof. 12 hours of playtime. PartyBoost to connect multiple JBL speakers simultaneously.', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=85', stock: 22, badge: null },
  { id: '4', name: 'Canon EOS R50 Mirrorless Camera', category: 'Electronics', price: 64999, rating: 4.7, reviews: 431, description: '24.2MP APS-C CMOS sensor with DIGIC X processor for stunning photos and 4K video. Dual Pixel CMOS AF II with subject tracking. Compact and lightweight — perfect for creators and travel photographers.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=85', stock: 8, badge: null },
  { id: '5', name: 'iPad Air (M2 Chip)', category: 'Electronics', price: 59999, rating: 4.8, reviews: 2109, description: 'Powerful M2 chip with a stunning 10.9-inch Liquid Retina display. All-day battery life, USB-C with 2x faster transfer speeds, and Apple Pencil support. Available in five gorgeous colors.', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=85', stock: 12, badge: null },
  { id: '6', name: 'Logitech MX Master 3S Mouse', category: 'Electronics', price: 7999, rating: 4.9, reviews: 4532, description: 'Ultra-fast MagSpeed electromagnetic scrolling, 8K DPI sensor, and whisper-quiet silent clicks. Works on any surface including glass. Connect up to 3 devices simultaneously via Bluetooth or USB receiver.', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=85', stock: 30, badge: 'Bestseller' },
  { id: '7', name: 'Dell 27" 4K IPS Monitor', category: 'Electronics', price: 32999, rating: 4.6, reviews: 1203, description: '3840x2160 UHD resolution with 99% sRGB color coverage for true-to-life visuals. USB-C with 90W power delivery, height-adjustable ergonomic stand, and built-in speakers. Flicker-free ComfortView display.', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=85', stock: 9, badge: null },

  // Footwear
  { id: '9', name: 'Nike Air Max 270', category: 'Footwear', price: 9995, rating: 4.5, reviews: 6721, description: 'Inspired by Air Max icons of the past, the Air Max 270 delivers an ultra-soft ride with the largest Air unit ever. Breathable mesh upper with bold color blocking and foam midsole for a plush, comfortable feel underfoot all day.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85', stock: 25, badge: 'Trending' },
  { id: '10', name: 'Adidas Ultraboost 23', category: 'Footwear', price: 14999, rating: 4.7, reviews: 3841, description: 'Responsive Boost midsole returns energy with every step. Primeknit+ upper adapts to your foot shape with Linear Energy Push for a propulsive toe-off. The ultimate running shoe for daily training and street style.', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=85', stock: 18, badge: null },
  { id: '11', name: 'Puma RS-X Retro Sneakers', category: 'Footwear', price: 6999, rating: 4.3, reviews: 1892, description: 'Retro-inspired running sneaker with chunky RS-X sole and bold color combinations. Leather and mesh upper with RS cushioning technology. Padded collar for ankle support — great for casual everyday wear.', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=85', stock: 20, badge: null },
  { id: '12', name: 'Red Tape Formal Oxford Shoes', category: 'Footwear', price: 2499, rating: 4.4, reviews: 2310, description: 'Premium genuine leather upper with classic brogue detailing. Cushioned insole for all-day comfort and durable rubber outsole with non-slip grip. Available in Black and Tan. Office-ready sophistication.', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=85', stock: 30, badge: null },
  { id: '13', name: 'Crocs Classic Clog', category: 'Footwear', price: 3499, rating: 4.6, reviews: 8901, description: 'The iconic Crocs Classic Clog crafted with Croslite foam for all-day comfort. Ventilation ports provide breathability and drainage. Lightweight, odor-resistant, and easy to clean — the world\'s most comfortable shoe.', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=85', stock: 40, badge: 'Bestseller' },

  // Clothing
  { id: '14', name: 'Levi\'s 511 Slim Fit Jeans', category: 'Clothing', price: 3499, rating: 4.6, reviews: 9231, description: 'Sits below waist with a slim fit from hip to ankle. 99% cotton with a touch of stretch for all-day comfort. Classic 5-pocket styling with Levi\'s signature arcuate stitching. A wardrobe essential since 1954.', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=85', stock: 50, badge: null },

  { id: '16', name: 'Allen Solly Regular Fit Shirt', category: 'Clothing', price: 1199, rating: 4.5, reviews: 3421, description: 'Premium 100% cotton with a smooth easy-iron finish. Regular fit with spread collar and single chest pocket. Wrinkle-resistant fabric keeps you looking sharp all day — from boardroom to casual Fridays.', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85', stock: 45, badge: null },
  { id: '17', name: 'Zara Floral Midi Dress', category: 'Clothing', price: 2999, rating: 4.3, reviews: 1823, description: 'Flowing midi dress in lightweight viscose with an all-over floral print. V-neckline, adjustable shoulder straps, and shirred back for a flattering silhouette. Perfect for summer evenings and beach outings.', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=85', stock: 35, badge: null },
  { id: '18', name: 'Nike Dri-FIT Training T-Shirt', category: 'Clothing', price: 1799, rating: 4.7, reviews: 5621, description: 'Sweat-wicking Dri-FIT technology moves moisture away from skin for quick evaporation. Standard fit with crew neck. Lightweight and breathable — ideal for gym sessions, running, and outdoor workouts.', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=85', stock: 55, badge: 'Bestseller' },
  { id: '19', name: 'Woodland Casual Windbreaker', category: 'Clothing', price: 4999, rating: 4.5, reviews: 2103, description: 'Water-resistant polyester shell with warm fleece lining. Multiple zippered pockets, adjustable hood and hemline for weather protection. Packable design folds into its own pocket — perfect for travel and outdoors.', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=85', stock: 20, badge: null },

  // Accessories
  { id: '20', name: 'Ray-Ban Aviator Sunglasses', category: 'Accessories', price: 6500, rating: 4.8, reviews: 7823, description: 'Iconic aviator frame in lightweight metal with crystal lenses offering 100% UV protection. Adjustable nose pads for a custom fit. Classic Gold/G-15 green — the original and most iconic sunglass design in history.', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=85', stock: 30, badge: null },
  { id: '21', name: 'Fossil Leather Bifold Wallet', category: 'Accessories', price: 2299, rating: 4.6, reviews: 3102, description: 'Slim bifold in genuine leather with RFID-blocking technology to protect your cards. 8 card slots, 2 currency compartments, and a clear ID window. Available in black, brown, and cognac. Gift box included.', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=85', stock: 40, badge: null },
  { id: '22', name: 'Wildcraft 45L Hiking Backpack', category: 'Accessories', price: 2999, rating: 4.5, reviews: 2891, description: 'Ergonomic back panel with padded shoulder straps and hip belt for load distribution. Dedicated laptop compartment, hydration bladder compatible, and rain cover included. Built for treks, travel, and adventure.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=85', stock: 25, badge: null },
  { id: '23', name: 'Titan Edge Ultra-Slim Watch', category: 'Accessories', price: 8995, rating: 4.7, reviews: 1923, description: 'World\'s slimmest watch at 6.45mm — stainless steel case with sapphire crystal glass. Water resistant to 30m with genuine leather strap. Quartz movement and 2-year battery. Understated everyday luxury.', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=85', stock: 15, badge: 'New' },
  { id: '24', name: 'Fastrack Sports Cap', category: 'Accessories', price: 599, rating: 4.3, reviews: 2341, description: 'Structured 6-panel cap with moisture-wicking sweatband. Adjustable snapback closure for a universal fit. Embroidered logo, pre-curved brim. Lightweight and breathable — great for sport and everyday casual wear.', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85', stock: 60, badge: null },

  // Fitness
  { id: '25', name: 'Boldfit Premium Yoga Mat (6mm)', category: 'Fitness', price: 799, rating: 4.5, reviews: 5621, description: 'Non-slip natural rubber base with TPE foam layer for superior cushioning. 6mm thick for joint protection during yoga, pilates, and stretching. Includes carry strap and printed alignment lines for correct posture.', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=85', stock: 35, badge: null },
  { id: '26', name: 'Rubber Hex Dumbbell Pair (10kg)', category: 'Fitness', price: 1899, rating: 4.6, reviews: 2103, description: 'Hexagonal rubber-coated dumbbells prevent rolling and protect floors. Chrome knurled handle for a secure, non-slip grip. Sold as a pair (total 20kg). Ideal for home gym strength training and toning exercises.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=85', stock: 20, badge: null },



  // Kitchen
  { id: '29', name: 'Prestige Iris 750W Mixer Grinder', category: 'Kitchen', price: 3299, rating: 4.6, reviews: 4231, description: '750W motor with 3-speed control and pulse function for precision grinding. Includes 3 stainless steel jars (1.5L, 1L, 0.4L) for blending and chutney making. Overload protection with 2-year warranty.', image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=85', stock: 18, badge: null },
  { id: '30', name: 'Milton Thermosteel Flask 1L', category: 'Kitchen', price: 899, rating: 4.8, reviews: 6821, description: 'Double-wall vacuum insulation keeps drinks hot for 24 hours and cold for 48 hours. Food-grade stainless steel interior, BPA-free construction. Leak-proof lid doubles as a cup. Essential for travel and outdoor use.', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=85', stock: 45, badge: 'Bestseller' },
  { id: '31', name: 'Borosil Glass Container Set (3pc)', category: 'Kitchen', price: 1299, rating: 4.5, reviews: 2892, description: 'Set of 3 borosilicate glass containers with leak-proof snap-lock lids. Microwave, oven, and dishwasher safe. Sizes: 320ml, 500ml, and 900ml. Chemical-free, odor-resistant, and transparent for easy meal tracking.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85', stock: 30, badge: null },


  // Home

  { id: '34', name: 'Oak Finish Study Desk with Shelves', category: 'Home', price: 8999, rating: 4.6, reviews: 892, description: 'Solid engineered wood with natural oak veneer finish. Features 2 open shelves, a cable management hole, and sturdy powder-coated metal legs. 120cm wide workspace with 80kg weight capacity. Easy flat-pack assembly.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=85', stock: 8, badge: null },
  { id: '35', name: 'Bombay Dyeing Cotton Bedsheet Set', category: 'Home', price: 1499, rating: 4.5, reviews: 3821, description: '100% pure cotton with 186-thread count for a soft, breathable sleep. Double bed size: 1 bedsheet (228x274cm) + 2 pillow covers. Reactive dye printing for vibrant, fade-resistant colors. Machine washable and easy care.', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=85', stock: 40, badge: null },
  { id: '36', name: 'Indoor Plant Trio (Money, Snake, Lily)', category: 'Home', price: 799, rating: 4.7, reviews: 2103, description: 'Set of 3 easy-care air-purifying plants: Money Plant, Snake Plant, and Peace Lily. Comes in 4-inch ceramic pots with drainage holes. Thrive in low-to-medium light — perfect for desks, bedrooms, and living rooms.', image: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=600&q=85', stock: 25, badge: 'New' },

  // Stationery
  { id: '37', name: 'Parker Jotter Ballpoint Pen', category: 'Stationery', price: 499, rating: 4.7, reviews: 4521, description: 'Iconic stainless steel barrel with chrome trim and the distinctive Parker arrow clip. Smooth-writing blue medium point refill with 2km ink capacity. Click retraction mechanism with pocket-safe design. A classic since 1954.', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&q=85', stock: 70, badge: null },
  { id: '38', name: 'Leuchtturm1917 A5 Hardcover Notebook', category: 'Stationery', price: 1299, rating: 4.8, reviews: 6231, description: '251 numbered pages with table of contents and 8 perforated tear-out pages. 80g/m² ink-proof archival paper — no bleed-through. Dotted grid, ribbon bookmark, elastic closure, and expandable inner pocket.', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=85', stock: 40, badge: 'Bestseller' },
  { id: '39', name: 'Atomic Habits — James Clear', category: 'Stationery', price: 399, rating: 4.9, reviews: 18921, description: 'The proven framework for building good habits and breaking bad ones. Learn how tiny 1% improvements compound into remarkable long-term results. #1 New York Times bestseller with over 10 million copies sold worldwide.', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=85', stock: 55, badge: 'Bestseller' },

  // Beauty
  { id: '40', name: 'Dyson Supersonic Hair Dryer', category: 'Beauty', price: 27900, rating: 4.8, reviews: 3102, description: 'Intelligent heat control measures air temperature 40x per second to prevent extreme heat damage. Fast-drying with 3 speeds and 4 heat settings. Includes 5 magnetic styling attachments. Engineered for all hair types.', image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=85', stock: 10, badge: null },
  { id: '41', name: 'Minimalist 2% Salicylic Acid Serum', category: 'Beauty', price: 499, rating: 4.6, reviews: 12031, description: 'Targets blackheads, whiteheads, and enlarged pores with 2% Salicylic Acid + LHA complex for deep pore cleansing. Oil-free, non-comedogenic, and dermatologically tested. Suitable for oily and acne-prone skin types.', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=85', stock: 65, badge: 'Trending' },
  { id: '42', name: 'Beardo Beard Growth Oil 50ml', category: 'Beauty', price: 349, rating: 4.5, reviews: 8921, description: 'Enriched with Almond, Thyme, Jojoba, and Vitamin E oils for faster growth and a thicker beard. Reduces itch and dandruff. Non-greasy formula with a light woody fragrance. Lasts 2–3 months with regular use.', image: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=600&q=85', stock: 50, badge: null },

  // Grocery
  { id: '43', name: 'Yoga Bar Fruit Muesli 1kg', category: 'Grocery', price: 449, rating: 4.5, reviews: 5231, description: 'Real fruit muesli with rolled oats, nuts, and seeds — no added sugar or preservatives. High in fiber with 6g protein per serving. Ready in 2 minutes — just add milk or yogurt. Certified by India Organic.', image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=600&q=85', stock: 45, badge: null },
  { id: '44', name: 'Nescafé Gold Blend Coffee 200g', category: 'Grocery', price: 699, rating: 4.7, reviews: 9821, description: 'Premium freeze-dried blend of Arabica and Robusta beans for a rich, smooth cup with velvety crema. Resealable tin locks in freshness. Makes approximately 110 cups. No chicory — 100% pure coffee experience.', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=85', stock: 50, badge: 'Bestseller' },
  { id: '45', name: 'Farmley Premium Mixed Nuts 500g', category: 'Grocery', price: 599, rating: 4.6, reviews: 3892, description: 'Premium mix of cashews, almonds, walnuts, pistachios, and raisins. Dry-roasted with no added oil or salt. Rich in omega-3, protein, and antioxidants. Resealable box for freshness — great for daily snacking and gifting.', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=85', stock: 40, badge: null },

  // Additional Electronics

  { id: '47', name: 'Samsung Galaxy Buds3 Pro', category: 'Electronics', price: 19999, rating: 4.7, reviews: 3421, description: 'Premium wireless earbuds with intelligent ANC and ambient sound. 26-hour total battery life with charging case. IPX7 water resistance and touch controls. Seamless connectivity with Samsung devices.', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=85', stock: 25, badge: null },
  { id: '48', name: 'Asus TUF Gaming Laptop 15.6"', category: 'Electronics', price: 89999, rating: 4.6, reviews: 2103, description: 'RTX 4050 graphics and Intel Core i7-12700H processor. 16GB DDR5 RAM, 512GB SSD for smooth gaming and creative work. 144Hz display, RGB keyboard, and military-grade durability.',  image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=85', stock: 8, badge: null },



  // Additional Footwear
  { id: '51', name: 'Puma Rs-Z Basic Shoes', category: 'Footwear', price: 5499, rating: 4.4, reviews: 2892, description: 'Retro-inspired RS-Z model with modern comfort. Lightweight mesh upper with rubber outsole. Great for casual daily wear and street style. Available in multiple colors.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85', stock: 28, badge: null },
  { id: '52', name: 'Skechers Go Walk 6 Shoes', category: 'Footwear', price: 4999, rating: 4.6, reviews: 5102, description: 'Ultra-lightweight cushioning with Goga Max insole technology. Walking shoe designed for all-day comfort. Slip-on design with flexible outsole. Perfect for seniors and comfort seekers.', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=85', stock: 32, badge: null },
  { id: '53', name: 'Vans Old Skool Classic Sneakers', category: 'Footwear', price: 4499, rating: 4.6, reviews: 7821, description: 'Iconic silhouette with side stripe design. Canvas and suede upper with waffle sole for grip. Cushioned insole for comfort. Timeless style for casual and skateboard culture.', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=85', stock: 40, badge: null },
  { id: '54', name: 'New Balance 990v5 Shoes', category: 'Footwear', price: 16999, rating: 4.7, reviews: 3102, description: 'Premium comfort running shoe with ENCAP midsole. Leather and nubuck upper with reflective details. Made in USA. Endorsed by athletes for superior durability.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85', stock: 15, badge: null },
  { id: '55', name: 'Timberland Classic Boots', category: 'Footwear', price: 12999, rating: 4.5, reviews: 4231, description: 'Waterproof leather boots with ReBOTL fabric lining. Sealed seams and rubber lug outsole for traction. Comfortable break-in period with iconic style. Perfect for outdoor adventures.', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=85', stock: 18, badge: null },

  // Additional Clothing  
  { id: '56', name: 'Tommy Hilfiger Polo Shirt', category: 'Clothing', price: 2999, rating: 4.5, reviews: 3823, description: 'Classic polo shirt with embroidered logo. 100% cotton with ribbed collar and cuffs. Available in navy, white, and red. Perfect for casual and semi-formal occasions.', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85', stock: 50, badge: null },
  { id: '57', name: 'Wrangler Regular Fit Jeans', category: 'Clothing', price: 2499, rating: 4.4, reviews: 2103, description: 'Classic regular-fit jeans with comfort stretch. Durable denim with traditional 5-pocket styling. Great for everyday wear. Available in dark and light wash.', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=85', stock: 55, badge: null },
  { id: '58', name: 'Adidas Linear Track Jacket', category: 'Clothing', price: 3999, rating: 4.6, reviews: 2892, description: 'Classic track jacket with 3 stripes on sleeves. Lightweight and breathable. Zip pockets and ribbed cuffs for comfort. Perfect for gym or casual wear.', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=85', stock: 25, badge: null },
  { id: '60', name: 'Calvin Klein Crew Neck T-Shirt', category: 'Clothing', price: 1499, rating: 4.4, reviews: 4102, description: 'Premium cotton crew neck tee with minimalist branding. Comfortable fit, durable construction, and easy care. Available in black, white, and gray. A wardrobe staple.', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=85', stock: 60, badge: null },

  // Additional Accessories
  { id: '61', name: 'Gucci GG Canvas Crossbody Bag', category: 'Accessories', price: 24999, rating: 4.7, reviews: 1892, description: 'Iconic GG canvas with leather trim. Adjustable shoulder strap and interior pockets. Luxury design with timeless appeal. Perfect for travel and everyday use.', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=85', stock: 8, badge: null },


  { id: '64', name: 'Coach Signature Wallet', category: 'Accessories', price: 6999, rating: 4.5, reviews: 2103, description: 'Genuine leather with Coach signature lining. Multiple card slots and bill compartments. RFID blocking technology. Available in various colors. Includes original box.', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=85', stock: 20, badge: null },
  { id: '65', name: 'Oakley Holbrook Sunglasses', category: 'Accessories', price: 11999, rating: 4.7, reviews: 3421, description: 'Iconic Holbrook design with Prizm lenses for enhanced color and contrast. Lightweight O Matter frame with excellent durability. 100% UV protection. Available in multiple colors.', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=85', stock: 22, badge: null },

  // Additional Fitness



  { id: '69', name: 'Yoga Wheel 12 Inch', category: 'Fitness', price: 1299, rating: 4.5, reviews: 2892, description: 'Perfect for stretching the front body, chest, and core. TPE foam back support with non-slip outer surface. Durable PP plastic wheel. Includes exercise guide PDF.', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=85', stock: 30, badge: null },
  { id: '70', name: 'Jump Rope Speed Steel Cable', category: 'Fitness', price: 599, rating: 4.4, reviews: 5102, description: 'Ultra-fast steel cable with bearing-based rotation system. Waterproof PVC-coated handles with foam grip. Lightweight and durable for intense workouts. Adjustable length for all heights.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=85', stock: 50, badge: null },

  // Additional Kitchen
  { id: '71', name: 'Instant Pot DUO Plus 6 Quart', category: 'Kitchen', price: 8999, rating: 4.7, reviews: 7231, description: 'Pressure cooker and slow cooker combo. 7-in-1 device for diverse cooking styles. Stainless steel pot with 3D heating system. Keep Warm function and reliable safety mechanisms.', image: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=600&q=85', stock: 14, badge: 'Bestseller' },
  { id: '72', name: 'KitchenAid Stand Mixer 5-Quart', category: 'Kitchen', price: 39999, rating: 4.8, reviews: 4231, description: 'Professional-grade all-metal construction. Powerful 315W motor with 10-speed settings. Includes flat beater, dough hook, and wire whip. Tilt-head design for easy access.', image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=85', stock: 8, badge: null },




  // Additional Home


  { id: '78', name: 'IKEA Billy Bookcase Oak Veneer', category: 'Home', price: 4999, rating: 4.4, reviews: 5631, description: 'Classic bookcase in oak veneer with 4 shelves. Adjustable shelves to fit different book sizes. Compact design perfect for bedrooms or living rooms. Space-saving storage solution.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=85', stock: 20, badge: null },

  { id: '80', name: 'Levoit Air Purifier Core 300', category: 'Home', price: 8999, rating: 4.7, reviews: 6231, description: '3-stage filtration system cleans 547 sq ft in 1 hour. HEPA and activated carbon filters. Whisper-quiet operation at 24dB. Energy efficient with auto mode.', image: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=600&q=85', stock: 18, badge: null },

  // Additional Stationery  
  { id: '81', name: 'Moleskine Classic Hard Cover Notebook', category: 'Stationery', price: 2299, rating: 4.7, reviews: 5102, description: 'Iconic soft-touch cover with elastic closure and ribbon bookmark. 240 pages of acid-free paper. Lay-flat design perfect for note-taking. Available in ruled, dotted, and blank.', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=85', stock: 35, badge: null },
  { id: '82', name: 'Pilot G2 Premium Pen 0.7mm', category: 'Stationery', price: 299, rating: 4.8, reviews: 8231, description: 'Smooth-writing gel ink with comfortable grip. Refillable and long-lasting. Precision writing for professionals and students. Available in multiple colors.', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&q=85', stock: 80, badge: 'Bestseller' },
  { id: '83', name: 'Staedtler Colored Pencil Set 48pc', category: 'Stationery', price: 1999, rating: 4.6, reviews: 3102, description: 'Premium color pencils with vibrant, blendable hues. Thick, soft leads for smooth application. Includes sharpener and storage tin. Perfect for art, design, and creative work.', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&q=85', stock: 22, badge: null },
  { id: '84', name: 'Rhodia DotPad A4 Notebook', category: 'Stationery', price: 899, rating: 4.5, reviews: 2103, description: 'Premium smooth paper with subtle dot grid. 80 sheets of 80g paper. French design with contemporary style. Perfect for planning, sketching, and bullet journaling.', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=85', stock: 30, badge: null },
  { id: '85', name: 'Post-it Super Sticky Notes 12-Pack', category: 'Stationery', price: 499, rating: 4.4, reviews: 4531, description: 'Extra-sticky adhesive holds longer on surfaces. 90 sheets per pad with broad color selection. Acid-free paper suitable for recycling. Office essential for organization.', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&q=85', stock: 70, badge: null },

  // Additional Beauty
  { id: '86', name: 'GHD Gold Hair Straightener', category: 'Beauty', price: 12999, rating: 4.8, reviews: 4231, description: 'Professional ceramic plates heat to 365°F in 20 seconds. Ionic technology reduces frizz. Ghd-contour technology for effortless styling. Universal voltage for worldwide use.', image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=85', stock: 12, badge: null },
  { id: '87', name: 'Olay Regenerist Retinol Serum', category: 'Beauty', price: 1299, rating: 4.6, reviews: 7821, description: 'Advanced retinol complex reduces fine lines and wrinkles. Lightweight formula absorbs quickly. Suitable for sensitive skin. Dermatologist-tested and clinically proven results.', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=85', stock: 45, badge: null },
  { id: '88', name: 'MAC Fix+ Spray 100ml', category: 'Beauty', price: 599, rating: 4.5, reviews: 3102, description: 'Professional setting spray that locks makeup in place. Water-based formula that mists evenly and dries quickly. Keeps makeup vibrant throughout the day. Travel-friendly size.', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=85', stock: 50, badge: null },
  { id: '89', name: 'Batiste Dry Shampoo Spray', category: 'Beauty', price: 399, rating: 4.4, reviews: 6231, description: 'Instantly refreshes hair between washes. Absorbs oil and adds volume and texture. Available in Original, Blush, and Tropical scents. Perfect for busy lifestyles.', image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=85', stock: 65, badge: 'Bestseller' },
  { id: '90', name: 'Neutrogena Ultra Sheer SPF 50+', category: 'Beauty', price: 349, rating: 4.6, reviews: 8102, description: 'Lightweight sunscreen with broad-spectrum UV protection. Water-resistant for 80 minutes. Non-greasy formula suitable for daily use. Dermatologist-recommended and reef-safe.', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=85', stock: 70, badge: null},

  // Additional Grocery
  { id: '91', name: 'Saffola Gold Refined Vegetable Oil 1L', category: 'Grocery', price: 199, rating: 4.5, reviews: 4102, description: 'Heart-friendly vegetable oil with low cholesterol. Pure and refined with natural taste. Suitable for all cooking methods. Packaged with care to maintain freshness.', image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=600&q=85', stock: 50, badge: null },
  { id: '92', name: 'Basmati Rice Daawat 2kg', category: 'Grocery', price: 449, rating: 4.6, reviews: 3892, description: 'Extra-long premium basmati rice with natural aroma. Aged for maximum fragrance and taste. Easy to cook, fluffy grains every time. Perfect for biryanis and pulaos.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=85', stock: 40, badge: null },
  { id: '93', name: 'Strong Gold Flour 5kg', category: 'Grocery', price: 299, rating: 4.4, reviews: 2103, description: 'Premium wheat flour for baking and everyday cooking. Fine texture with consistent quality. Packed in food-grade packaging. Suitable for bread, cakes, and Indian breads.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=85', stock: 35, badge: null },
  { id: '94', name: 'Cadbury Dairy Milk Chocolate 200g', category: 'Grocery', price: 199, rating: 4.7, reviews: 9821, description: 'Beloved chocolate with smooth creamy taste. Made with quality milk and cocoa. Perfect for gifting or personal indulgence. Iconic brand trusted by millions worldwide.', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=85', stock: 60, badge: 'Bestseller' },
  { id: '95', name: 'Organic Coconut Oil 500ml', category: 'Grocery', price: 699, rating: 4.6, reviews: 5102, description: 'Cold-pressed virgin coconut oil for cooking and beauty. Pure and unrefined with no additives. Rich in antioxidants and healthy fats. Suitable for hair, skin, and cooking.', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=85', stock: 30, badge: null },

  // Final products to reach 100
  { id: '96', name: 'Sony WF-C700N Earbuds', category: 'Electronics', price: 4999, rating: 4.5, reviews: 2103, description: 'Noise-cancelling wireless earbuds with up to 8 hours battery life. Compact design with comfortable fit. Fast charging and multipoint pairing. Water-resistant design.', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=85', stock: 22, badge: null },
  { id: '97', name: 'Decathlon Running Shoes Men', category: 'Footwear', price: 1999, rating: 4.3, reviews: 4531, description: 'Lightweight running shoes with cushioned insole. Breathable mesh upper for comfort. Durable rubber outsole with good grip. Affordable and quality construction.', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=85', stock: 45, badge: null },
  { id: '98', name: 'Puma Sports Shorts', category: 'Clothing', price: 999, rating: 4.4, reviews: 3102, description: 'Lightweight and breathable athletic shorts. Moisture-wicking fabric for active wear. Elastic waistband with drawstring. Available in multiple colors. Perfect for gym and sports.', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=85', stock: 55, badge: null },
  { id: '99', name: 'Sony CE Canvas Crossbody Bag', category: 'Accessories', price: 3499, rating: 4.5, reviews: 1823, description: 'Durable canvas material with leather accents. Multiple compartments for organization. Adjustable shoulder strap. Stylish and practical for everyday use.', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=85', stock: 28, badge: null },
  { id: '100', name: 'Hamilton Analog Watch', category: 'Accessories', price: 24999, rating: 4.8, reviews: 2892, description: 'Swiss precision timekeeping with automatic movement. Stainless steel case and leather strap. Water resistant to 50m. Classic design suitable for formal and casual wear.', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=85', stock: 10, badge: null },
];

let orders = [];

app.get('/api/products', (req, res) => {
  let result = [...products];
  const { search, category, minPrice, maxPrice, sort } = req.query;
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
  if (category) result = result.filter(p => p.category === category);
  if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));
  if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
  if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  if (sort === 'popular') result.sort((a, b) => b.reviews - a.reviews);
  res.json(result);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.get('/api/categories', (req, res) => {
  const cats = [...new Set(products.map(p => p.category))];
  res.json(cats);
});

app.post('/api/orders', (req, res) => {
  const { items, customerName, address } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ error: 'Cart is empty' });
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const order = {
    id: uuidv4().slice(0, 8).toUpperCase(), items,
    customerName: customerName || 'Guest',
    address: address || 'Not provided',
    total, status: 'Placed',
    placedAt: new Date().toISOString(),
    timeline: [{ status: 'Placed', time: new Date().toISOString() }]
  };
  orders.push(order);
  setTimeout(() => { const o = orders.find(x => x.id === order.id); if (o) { o.status = 'Shipped'; o.timeline.push({ status: 'Shipped', time: new Date().toISOString() }); } }, 15000);
  setTimeout(() => { const o = orders.find(x => x.id === order.id); if (o) { o.status = 'Delivered'; o.timeline.push({ status: 'Delivered', time: new Date().toISOString() }); } }, 30000);
  res.status(201).json(order);
});

app.get('/api/orders', (req, res) => res.json(orders.slice().reverse()));
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
