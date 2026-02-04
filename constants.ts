
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Brewinx Noir',
    description: 'A deep, charcoal-infused espresso with notes of obsidian and dark cocoa.',
    price: 450,
    category: 'Specialty',
    image: '/images/menu/espresso.jpeg',
    options: {
      milk: ['None', 'Oat', 'Almond', 'Whole'],
      sweetness: ['None', 'Light', 'Regular']
    }
  },
  {
    id: 's2',
    name: 'Velvet Caramel Latte',
    description: 'Silky smooth espresso layered with house-made salted caramel and velvety oat milk foam.',
    price: 380,
    category: 'Specialty',
    image: '/images/menu/latte.jpg',
    options: {
      milk: ['Oat', 'Almond', 'Whole'],
      sweetness: ['Light', 'Regular', 'Extra']
    }
  },
  {
    id: 's3',
    name: 'Hazelnut Affogato',
    description: 'A decadent fusion of double-shot espresso poured over artisan vanilla gelato with toasted hazelnuts.',
    price: 420,
    category: 'Specialty',
    image: '/images/menu/mocha.jpg',
    options: {
      toppings: ['Hazelnuts', 'Chocolate Shavings', 'Caramel Drizzle']
    }
  },
  {
    id: 's4',
    name: 'Lavender Honey Cold Brew',
    description: 'Cold-steeped for 20 hours, infused with French lavender and drizzled with wildflower honey.',
    price: 350,
    category: 'Specialty',
    image: '/images/menu/cold-brew.jpeg',
    options: {
      milk: ['None', 'Oat', 'Almond'],
      sweetness: ['Light', 'Regular']
    }
  },
  {
    id: 's5',
    name: 'Maple Cinnamon Cortado',
    description: 'Bold espresso balanced with steamed milk, pure maple syrup, and a whisper of Ceylon cinnamon.',
    price: 320,
    category: 'Specialty',
    image: '/images/menu/Cappuccino.jpeg',
    options: {
      milk: ['Whole', 'Oat', 'Almond'],
      sweetness: ['Light', 'Regular']
    }
  },
  {
    id: 'e1',
    name: 'Espresso',
    description: 'Rich, concentrated coffee with a creamy crema top.',
    price: 180,
    category: 'Hot',
    image: '/images/menu/espresso.jpeg'
  },
  {
    id: 'c1',
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk, and foam.',
    price: 240,
    category: 'Hot',
    image: '/images/menu/Cappuccino.jpeg'
  },
  {
    id: 'l1',
    name: 'Latte',
    description: 'Espresso with steamed milk and a light layer of foam.',
    price: 260,
    category: 'Hot',
    image: '/images/menu/latte.jpg'
  },
  {
    id: 'a1',
    name: 'Americano',
    description: 'Espresso shots topped with hot water.',
    price: 200,
    category: 'Hot',
    image: '/images/menu/americano.jpeg'
  },
  {
    id: 'm1',
    name: 'Mocha',
    description: 'Espresso with chocolate and steamed milk.',
    price: 290,
    category: 'Hot',
    image: '/images/menu/mocha.jpg'
  },
  {
    id: 'mc1',
    name: 'Macchiato',
    description: 'Espresso with a dollop of foam.',
    price: 220,
    category: 'Hot',
    image: '/images/menu/macchiato.jpg'
  },
  {
    id: 'cb1',
    name: 'Cold Brew',
    description: 'Slow-steeped for 18 hours for a smooth taste.',
    price: 250,
    category: 'Cold',
    image: '/images/menu/cold-brew.jpeg'
  },
  {
    id: 'fw1',
    name: 'Flat White',
    description: 'Espresso with microfoam for a velvety texture.',
    price: 260,
    category: 'Hot',
    image: '/images/menu/flat-white.jpg'
  },
  {
    id: 'cr1',
    name: 'Butter Croissant',
    description: 'Flaky, buttery perfection baked fresh daily.',
    price: 190,
    category: 'Bakery',
    image: '/images/menu/croissant.jpg'
  },
  {
    id: 'mu1',
    name: 'Blueberry Muffin',
    description: 'Moist muffin packed with fresh blueberries.',
    price: 180,
    category: 'Bakery',
    image: '/images/menu/muffin.jpg'
  },
  {
    id: 'do1',
    name: 'Glazed Donut',
    description: 'Soft, fluffy donut with sweet glaze.',
    price: 150,
    category: 'Bakery',
    image: '/images/menu/donut.jpg'
  },
  {
    id: 'sw1',
    name: 'Breakfast Sandwich',
    description: 'Egg, cheese, and your choice of bacon or sausage on a croissant.',
    price: 350,
    category: 'Bakery',
    image: '/images/menu/sandwich.jpg'
  },
  {
    id: 'co1',
    name: 'Chocolate Chip Cookie',
    description: 'Warm, chewy cookie with melty chocolate chips.',
    price: 150,
    category: 'Bakery',
    image: '/images/menu/cookie.jpg'
  },
  {
    id: 'br1',
    name: 'Fudge Brownie',
    description: 'Rich, fudgy brownie with chocolate chunks.',
    price: 150,
    category: 'Bakery',
    image: '/images/menu/brownie.jpg'
  }
];