export type equipment = {
  id: string;
  image: string;
  name: string;
  description: string;
};
export type category = {
  id: string;
  image: string;
  name: string;
};
export const featuredEquipments: equipment[] = [
  {
    id: "1",
    image: "https://salloumcompany.com/assets/HWAR-L-CuimRJ_5.jpg",
    name: "10,000 kg/hr Steam Boiler System",
    description:
      "Used 10,000 kg/hr steam boiler system, manufactured by XYZ Boilers Ltd, 2015. The system is designed for industrial steam generation, constructed from carbon steel with a fire-tube design. Maximum operating pressure is 16 bar with a design temperature of 200°C. The boiler is equipped with a dual-fuel burner capable of running on natural gas and light oil. Includes an economizer for energy efficiency and a blowdown tank. Dimensions are 7,200mm in length, 2,500mm in width, and 3,800mm in height. Total dry weight is 25,000 kg.",
  },
  {
    id: "2",
    image: "https://salloumcompany.com/assets/Chiller_air_Cooled-Bm2QZp9e.png",
    name: "500 kW Absorption Chiller Unit",
    description:
      "Used 500 kW absorption chiller unit, manufactured by ABC Cooling Solutions, 2012. The unit operates on a water/LiBr (lithium bromide) solution for refrigeration, driven by a natural gas-fired generator. It features a double-effect cycle for increased efficiency and is suitable for HVAC applications in commercial buildings. The chiller is mounted on a steel frame, measuring 6,000mm in length, 2,200mm in width, and 2,800mm in height. The system operates at a nominal temperature of 7°C with a 12°C cooling water inlet temperature.",
  },
  {
    id: "3",
    image: "https://salloumcompany.com/assets/evaporators-B2rUm-p9.png",
    name: "300 Ton Air-Cooled Chiller System",
    description:
      "Used 300 ton air-cooled chiller system, manufactured by DEF Chillers, 2017. The system uses R-134a refrigerant and is designed for commercial air conditioning applications. Features include microchannel condenser coils and variable-speed compressors for energy efficiency. The chiller is equipped with a weatherproof enclosure and anti-corrosion coating. Overall dimensions are 10,000mm in length, 3,000mm in width, and 3,200mm in height. Operating at a nominal temperature of 6°C with a maximum ambient temperature of 45°C.",
  },
  {
    id: "4",
    image: "https://salloumcompany.com/assets/unnamed-Cf8PblRq.jpg",
    name: "1,000 Ton Water-Cooled Chiller Unit",
    description:
      "Used 1,000 ton water-cooled chiller unit, manufactured by GHI Cooling Systems, 2018. The chiller operates with R-1233zd(E) refrigerant and is designed for large-scale industrial or commercial HVAC applications. The system includes a shell-and-tube heat exchanger, a centrifugal compressor, and a cooling tower for heat rejection. Dimensions are 8,500mm in length, 3,500mm in width, and 4,000mm in height. It operates at a nominal temperature of 5°C and requires a cooling water supply at 32°C.",
  },
  {
    id: "5",
    image:
      "https://salloumcompany.com/assets/BITZER_Recips_2-stage_FIN_PressEntryDetailDefault-x_JQcEI9.jpg",
    name: "150 kW Industrial Refrigeration Compressors",
    description:
      "Used 150 kW industrial refrigeration compressors, manufactured by JKL Compressors, 2016. This set includes two twin-screw compressors, each rated at 75 kW. The compressors use R-717 (ammonia) as the refrigerant and are suitable for large-scale cold storage facilities. Each unit features an oil separator, suction filters, and variable speed drives. The system is skid-mounted with dimensions of 4,000mm in length, 1,800mm in width, and 2,000mm in height. Operating pressures are 8 bar on the suction side and 25 bar on the discharge side.",
  },
  {
    id: "6",
    image:
      "https://salloumcompany.com/assets/fb550d45c804d77b6fed71fcc9e4f05a_medium-BL9yLjZQ.jpg",
    name: "50 kW TGA-2 Model Refrigeration Compressors",
    description:
      "Used 50 kW TGA-2 model refrigeration compressors, manufactured by MNO Cooling Equipment, 2013. These piston-type compressors are designed for medium to low-temperature applications in commercial refrigeration. The system uses R-404A refrigerant and includes oil management systems and vibration isolation mounts. Each compressor unit measures 2,200mm in length, 1,200mm in width, and 1,800mm in height. Nominal suction and discharge pressures are 5 bar and 20 bar, respectively.",
  },
  {
    id: "7",
    image: "https://salloumcompany.com/assets/v3-7-Blksl__1.webp",
    name: "600 m³/hr Evaporative Cooling Towers",
    description:
      "Used 600 m³/hr evaporative cooling towers, manufactured by PQR Cooling Systems, 2014. The cooling towers are constructed from FRP (fiber-reinforced plastic) and are designed for industrial process cooling. The towers feature axial fans, PVC fill media, and drift eliminators for optimal cooling efficiency. Each tower has a height of 8,500mm, a base diameter of 6,500mm, and is equipped with stainless steel fasteners. The system is capable of maintaining a cooling water outlet temperature of 28°C with an inlet of 35°C.",
  },
];

export const categories: category[] = [
  {
    id: "cooling",
    image: "cooling.jpg",
    name: "Cooling",
  },
  {
    id: "food-machinery",
    image: "food-machinery.jpg",
    name: "Food Machinery",
  },
  {
    id: "generators",
    image: "generators.jpg",
    name: "Generators",
  },
  {
    id: "boilers",
    image: "boilers.jpg",
    name: "Boilers",
  },
  {
    id: "air-compressors",
    image: "air-compressors.jpg",
    name: "Air Compressors",
  },
  {
    id: "machine-tool",
    image: "machine-tool.jpg",
    name: "Machine Tool",
  },
  {
    id: "pumps-electric-motor",
    image: "pumps-electric-motor.jpg",
    name: "Pumps & Electric Motor",
  },
];

export type faqType = {
  question: string;
  answer: string;
};
export const questions: faqType[] = [
  {
    question: "What are the main activities of Salloum Company?",
    answer:
      "Salloum Company specializes in the sale, purchase, and resale of used industrial equipment. We offer sales, purchase, brokerage, and consignment services for recent used equipment used in various industrial processes.",
  },
  {
    question: "What types of industrial equipment do you sell?",
    answer:
      "We offer a wide range of used industrial equipment, including machinery, equipment, and complete units, covering all industrial sectors.",
  },
  {
    question: "How can I purchase equipment from Salloum Company?",
    answer:
      "To purchase equipment, you can consult our online catalog, contact us directly for personalized advice, or speak to one of our experts available 24/7.",
  },
  {
    question: "Does Salloum Company buy used industrial equipment?",
    answer:
      "Yes, we also buy used industrial equipment. If you have any machinery or equipment to sell, contact us for an evaluation and offer.",
  },
  {
    question: "Do you offer brokerage services for industrial equipment?",
    answer:
      "Yes, we offer brokerage services to facilitate the sale and purchase of industrial equipment between different parties.",
  },
  {
    question:
      "What are the advantages of buying used equipment from Salloum Company?",
    answer:
      "When you buy from us, you get quick access to high-performance equipment, save on costs compared to new equipment, and receive 24/7 expert support.",
  },
  {
    question: "In how many countries is Salloum Company active?",
    answer:
      "Salloum Company has an international reach, with operations in over 35 countries.",
  },
  {
    question: "What type of support do you offer?",
    answer:
      "We offer expert support available 24/7 to answer all your questions and help you with your purchases and sales of industrial equipment.",
  },
  {
    question: "Can I visit your warehouse to see the available equipment?",
    answer:
      "Yes, we encourage our customers to visit our warehouse to inspect the available equipment. Please contact us to make an appointment.",
  },
  {
    question: "How do I get an appraisal for my used industrial equipment?",
    answer:
      "You can get an assessment by contacting us directly. Our experts will assess your equipment and provide you with a competitive offer.",
  },
];
