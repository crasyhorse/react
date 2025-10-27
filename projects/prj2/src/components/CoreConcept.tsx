type PropData = {
  image: string;
  title: string;
  description: string;
}

function CoreConcept({ image, title, description }: PropData) {
  return (
    <li>
      <img src={image} alt="" />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}

export default CoreConcept;
