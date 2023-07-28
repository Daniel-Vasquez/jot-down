export const LinkGenerator = ({ text }) => {
  const generateLinkElements = () => {
    const regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const matches = text.match(regex);

    if (!matches) {
      return text;
    }

    const splitText = text.split(regex).filter(w => w !== "https" && w !== 'http');

    const elements = splitText.map((part, index) => {
      if (matches.includes(part)) {
        return (
          <a key={index} className='note-card-text__link' href={part} target="_blank">
            <span>{part}</span>
          </a>
        );
      }

      return part;
    });

    return elements;
  }

  return (
    <p className="note-card-text">
      {generateLinkElements()}
    </p>
  );
}