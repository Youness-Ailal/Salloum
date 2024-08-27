import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddEquipment from "../features/equipments/AddEquipment";
import EquipmentsTable from "../features/equipments/EquipmentsTable";
import EquipmentsTableOperations from "../features/equipments/EquipmentsTableOperations";
import uuidv4 from "uuid4"; // To generate unique IDs for file names
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { DB } from "../firebase/config";
import Button from "../ui/Button";
import { useState } from "react";
import { categories } from "../utils/constants";
const dt = [
  {
    name: "Steam Boiler\nView Details",
    image: "https://www.salloumcompany.com/assets/steam-boiler-BfCb9zqh.jpg",
  },
  {
    name: "Absorption Chiller\nView Details",
    image: "https://www.salloumcompany.com/assets/HWAR-L-CuimRJ_5.jpg",
  },
  {
    name: "Chiller Air Cooled\nView Details",
    image:
      "https://www.salloumcompany.com/assets/Chiller_air_Cooled-Bm2QZp9e.png",
  },
  {
    name: "Chiller Water Cooled\nView Details",
    image:
      "https://www.salloumcompany.com/assets/WaterCooled_Hero-837riou4.jpg",
  },
  {
    name: "Compressors\nView Details",
    image:
      "https://www.salloumcompany.com/assets/BITZER_Recips_2-stage_FIN_PressEntryDetailDefault-x_JQcEI9.jpg",
  },
  {
    name: "Compressors 2\nView Details",
    image:
      "https://www.salloumcompany.com/assets/K_F_F552T-S6H-20.2_8704-029R1.side_ProductSeries767x431-CNLxcEeL.png",
  },
  {
    name: "Condensing Units\nView Details",
    image:
      "https://www.salloumcompany.com/assets/1d23068da5345769cbe54762720425e2_medium-sQ0G7jTK.jpg",
  },
  {
    name: "Condensing Units 2\nView Details",
    image:
      "https://www.salloumcompany.com/assets/fb550d45c804d77b6fed71fcc9e4f05a_medium-BL9yLjZQ.jpg",
  },
  {
    name: "Condensers\nView Details",
    image:
      "https://www.salloumcompany.com/assets/pr_mistral_w_condenser-BRY3GvgT.png",
  },
  {
    name: "Cooling Towers\nView Details",
    image: "https://www.salloumcompany.com/assets/Cooling_Tower-BiCGO6XV.png",
  },
  {
    name: "Dry Coolers\nView Details",
    image: "https://www.salloumcompany.com/assets/dry_coolers-DqExLFkX.jpg",
  },
  {
    name: "Evaporators Glycol Air Coolers\nView Details",
    image: "https://www.salloumcompany.com/assets/evaporators-B2rUm-p9.png",
  },
  {
    name: "Evaporators Glycol Air Coolers 2\nView Details",
    image: "https://www.salloumcompany.com/assets/fichier_produit-Dm31Ueso.jpg",
  },
  {
    name: "Plate Heat Exchanger\nView Details",
    image:
      "https://www.salloumcompany.com/assets/plate-heat-exchanger-BiIsa7FJ.jpg",
  },
  {
    name: "Blast Freezer Stand Alone\nView Details",
    image:
      "https://www.salloumcompany.com/assets/blast-freezer-stand-alone-Rqo30eoT.png",
  },
  {
    name: "Freezer IQF\nView Details",
    image:
      "https://www.salloumcompany.com/assets/60acbce8fe71ea052ba86ce9_IQF_Freezer_singlelane_1000-B5oPk-dI.png",
  },
  {
    name: "Packaged Spiral Freezer\nView Details",
    image:
      "https://www.salloumcompany.com/assets/packaged-spiral-freezer-5vdN0ktq.png",
  },
  {
    name: "Spiral 3\nView Details",
    image: "https://www.salloumcompany.com/assets/spiral3-DGk3v_Jc.png",
  },
  {
    name: "Plate Freezers\nView Details",
    image:
      "https://www.salloumcompany.com/assets/Carsoe-Freezertech-Vertical-Freezer-1024x683-1-Dvga1ZKz.jpg",
  },
  {
    name: "v3 7\nView Details",
    image: "https://www.salloumcompany.com/assets/v3-7-Blksl__1.webp",
  },
  {
    name: "Cold Rooms\nView Details",
    image: "https://www.salloumcompany.com/assets/unnamed-Cf8PblRq.jpg",
  },
  {
    name: "Hermetic RF\nView Details",
    image: "https://www.salloumcompany.com/assets/Hermetic-RF-BqG3IWnW.jpg",
  },
  {
    name: "Refrigerant Pumps\nView Details",
    image: "https://www.salloumcompany.com/assets/image-asset-D4nobtT7.jpg",
  },
  {
    name: "Fire Pumps\nView Details",
    image: "https://www.salloumcompany.com/assets/1636140150072-C34zD6EZ.jpg",
  },
  {
    name: "Powergen\nView Details",
    image: "https://www.salloumcompany.com/assets/powergen-Cv8dqV4B.png",
  },
];
const data = dt.map(item => ({
  ...item,
  createdAt: "26 August 2024",
  name: item.name.replace("\nView Details", ""),
  category: categories[Math.floor(Math.random() * categories.length)].label,

  description: item.name,
  isFeatured: Math.random() > 0.5,
  isActive: true,
  stock: 1,
  timestamp: new Date(),
}));
function Equipments() {
  const [loading, setLoading] = useState(false);
  async function uploadImageAndGetUrl(imageUrl, imageName) {
    try {
      // Use a CORS proxy to bypass CORS restrictions
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const response = await fetch(proxyUrl + imageUrl, { mode: "cors" });
      const blob = await response.blob();

      // Create a unique file name in Firebase Storage
      const storage = getStorage();

      const storageRef = ref(storage, `images/${imageName}-${uuidv4()}`);

      // Upload the file
      const snapshot = await uploadBytes(storageRef, blob);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    }
  }

  // Function to upload data to Firestore with the new image URL
  async function uploadData() {
    try {
      setLoading(true);
      const collectionRef = collection(DB, "equipments");

      for (const item of data) {
        // Upload the image and get the new URL
        /* const newImageUrl = await uploadImageAndGetUrl(item.image, item.name); */

        // Add the item to Firestore with the new image URL
        await addDoc(collectionRef, item);
        console.log(`Document added: ${item.name}`);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All equipments</Heading>
        <EquipmentsTableOperations />
      </Row>

      <Row>
        <AddEquipment />
        {/* <Button isLoading={loading} onClick={uploadData}>
          Upload All
        </Button> */}

        <EquipmentsTable />
      </Row>
    </>
  );
}

export default Equipments;
