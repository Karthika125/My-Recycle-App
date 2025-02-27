import { useLocation, useNavigate } from "react-router-dom";
import "../styles/CraftIdea.css";

interface Material {
  name: string;
  quantity: string;
  category: string;
}

export default function CraftIdeas() {
  const location = useLocation();
  const navigate = useNavigate();
  const material: Material = location.state?.material || { name: "", quantity: "", category: "" };

  // Dummy craft ideas, thumbnails, and step-by-step descriptions for all categories
  const craftIdeas: Record<string, { name: string; thumbnail: string; steps: string[] }[]> = {
    Paper: [
      {
        name: "Origami Flowers",
        thumbnail: "https://picsum.photos/400/225?random=1", // Random dummy image
        steps: [
          "1. Start with a square piece of paper.",
          "2. Fold the paper diagonally to form a triangle.",
          "3. Fold the corners of the triangle to the center.",
          "4. Repeat the process to create multiple petals.",
          "5. Gently unfold the petals to form a flower shape.",
        ],
      },
      {
        name: "Paper Mache Bowls",
        thumbnail: "https://picsum.photos/400/225?random=2", // Random dummy image
        steps: [
          "1. Tear newspaper into small strips.",
          "2. Mix glue and water to create a paste.",
          "3. Dip the strips into the paste and layer them over a bowl.",
          "4. Let it dry completely.",
          "5. Paint and decorate the bowl as desired.",
        ],
      },
      {
        name: "DIY Greeting Cards",
        thumbnail: "https://picsum.photos/400/225?random=3", // Random dummy image
        steps: [
          "1. Fold a piece of cardstock in half.",
          "2. Cut out shapes or designs from colored paper.",
          "3. Glue the shapes onto the cardstock.",
          "4. Add a personalized message inside.",
          "5. Decorate with stickers or glitter.",
        ],
      },
    ],
    Plastic: [
      {
        name: "Bottle Planters",
        thumbnail: "https://picsum.photos/400/225?random=4", // Random dummy image
        steps: [
          "1. Cut a plastic bottle in half.",
          "2. Paint the outside of the bottle.",
          "3. Add drainage holes at the bottom.",
          "4. Fill with soil and plant your seeds.",
          "5. Water regularly and watch your plants grow!",
        ],
      },
      {
        name: "Plastic Bead Bracelets",
        thumbnail: "https://picsum.photos/400/225?random=5", // Random dummy image
        steps: [
          "1. Cut plastic bottles into small pieces.",
          "2. Heat the pieces to form beads.",
          "3. Paint the beads in your favorite colors.",
          "4. Thread the beads onto a string or elastic.",
          "5. Tie the ends to complete the bracelet.",
        ],
      },
      {
        name: "Recycled Plastic Keychains",
        thumbnail: "https://picsum.photos/400/225?random=6", // Random dummy image
        steps: [
          "1. Cut plastic into small shapes (e.g., hearts, stars).",
          "2. Sand the edges to smooth them out.",
          "3. Paint or decorate the shapes.",
          "4. Attach a keyring to the top.",
          "5. Your keychain is ready to use!",
        ],
      },
    ],
    Glass: [
      {
        name: "Painted Glass Bottles",
        thumbnail: "https://picsum.photos/400/225?random=7", // Random dummy image
        steps: [
          "1. Clean the glass bottle thoroughly.",
          "2. Apply a base coat of paint.",
          "3. Let it dry and add decorative designs.",
          "4. Seal the paint with a clear coat.",
          "5. Use as a vase or decorative piece.",
        ],
      },
      {
        name: "Glass Jar Candle Holders",
        thumbnail: "https://picsum.photos/400/225?random=8", // Random dummy image
        steps: [
          "1. Clean and dry a glass jar.",
          "2. Wrap the jar with twine or lace.",
          "3. Place a candle inside the jar.",
          "4. Light the candle for a cozy glow.",
          "5. Add decorative elements like ribbons or beads.",
        ],
      },
      {
        name: "Mosaic Art",
        thumbnail: "https://picsum.photos/400/225?random=9", // Random dummy image
        steps: [
          "1. Break colored glass into small pieces.",
          "2. Arrange the pieces on a surface to form a design.",
          "3. Glue the pieces in place.",
          "4. Let it dry completely.",
          "5. Grout the mosaic and clean the surface.",
        ],
      },
    ],
    Metal: [
      {
        name: "Tin Can Lanterns",
        thumbnail: "https://picsum.photos/400/225?random=10", // Random dummy image
        steps: [
          "1. Clean and dry a tin can.",
          "2. Use a hammer and nail to punch holes in a pattern.",
          "3. Paint the can if desired.",
          "4. Place a candle inside.",
          "5. Light the candle for a beautiful lantern effect.",
        ],
      },
      {
        name: "DIY Metal Wind Chimes",
        thumbnail: "https://picsum.photos/400/225?random=11", // Random dummy image
        steps: [
          "1. Collect small metal pieces (e.g., spoons, keys).",
          "2. Drill holes in the pieces for hanging.",
          "3. Attach the pieces to a metal ring or stick.",
          "4. Hang the wind chime outdoors.",
          "5. Enjoy the soothing sounds!",
        ],
      },
      {
        name: "Scrap Metal Sculptures",
        thumbnail: "https://picsum.photos/400/225?random=12", // Random dummy image
        steps: [
          "1. Gather scrap metal pieces.",
          "2. Weld or glue the pieces together to form a sculpture.",
          "3. Paint or polish the sculpture.",
          "4. Display your artwork indoors or outdoors.",
          "5. Be creative with shapes and designs!",
        ],
      },
    ],
    Fabric: [
      {
        name: "Patchwork Quilts",
        thumbnail: "https://picsum.photos/400/225?random=13", // Random dummy image
        steps: [
          "1. Cut fabric into squares or shapes.",
          "2. Sew the pieces together to form a quilt top.",
          "3. Add batting and a backing fabric.",
          "4. Quilt the layers together.",
          "5. Bind the edges to finish the quilt.",
        ],
      },
      {
        name: "DIY Tote Bags",
        thumbnail: "https://picsum.photos/400/225?random=14", // Random dummy image
        steps: [
          "1. Cut two rectangular pieces of fabric.",
          "2. Sew the sides and bottom together.",
          "3. Fold the top edge and sew to create a hem.",
          "4. Attach handles to the top.",
          "5. Decorate with fabric paint or patches.",
        ],
      },
      {
        name: "Fabric Scrap Coasters",
        thumbnail: "https://picsum.photos/400/225?random=15", // Random dummy image
        steps: [
          "1. Cut fabric scraps into small squares.",
          "2. Layer the scraps and sew them together.",
          "3. Trim the edges neatly.",
          "4. Add a backing fabric if desired.",
          "5. Use as coasters for your drinks!",
        ],
      },
    ],
    Wood: [
      {
        name: "Wooden Pallet Shelves",
        thumbnail: "https://picsum.photos/400/225?random=16", // Random dummy image
        steps: [
          "1. Disassemble a wooden pallet.",
          "2. Sand the wood to smooth the surface.",
          "3. Cut the wood into shelf sizes.",
          "4. Assemble and paint the shelves.",
          "5. Mount the shelves on the wall.",
        ],
      },
      {
        name: "Handmade Wooden Photo Frames",
        thumbnail: "https://picsum.photos/400/225?random=17", // Random dummy image
        steps: [
          "1. Cut wood into frame pieces.",
          "2. Sand and paint the pieces.",
          "3. Assemble the frame with glue or nails.",
          "4. Insert a photo or artwork.",
          "5. Display your framed photo!",
        ],
      },
      {
        name: "DIY Birdhouses",
        thumbnail: "https://picsum.photos/400/225?random=18", // Random dummy image
        steps: [
          "1. Cut wood into birdhouse pieces.",
          "2. Assemble the pieces with nails or glue.",
          "3. Add a small entrance hole.",
          "4. Paint or decorate the birdhouse.",
          "5. Hang it outdoors for birds to enjoy.",
        ],
      },
    ],
  };

  const recommendations = craftIdeas[material.category] || [];

  return (
    <div className="craft-ideas-container">
      <h1>Craft Ideas for {material.name}</h1>
      <div className="craft-ideas-grid">
        {recommendations.map((idea, index) => (
          <div key={index} className="craft-idea-card">
            <h3>{idea.name}</h3>
            <div className="video-thumbnail">
              <img src={idea.thumbnail} alt={idea.name} />
              <div className="play-button">▶</div>
            </div>
            <div className="steps-container">
              <h4>Steps:</h4>
              <ul>
                {idea.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <button className="button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}