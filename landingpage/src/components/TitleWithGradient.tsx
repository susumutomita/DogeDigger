import GradientText from './GradientText';

interface TitleWithGradientProps {
  text: string;
  gradientText: string;
  className?: string;
}

export default function TitleWithGradient({
  text,
  gradientText,
  className,
}: TitleWithGradientProps) {
  // Replace {gradient} placeholder with the gradient text
  const parts = text.split('{gradient}');

  if (parts.length === 1) {
    // No gradient placeholder found
    return <h2 className={className}>{text}</h2>;
  }

  return (
    <h2 className={className}>
      {parts[0]}
      <GradientText>{gradientText}</GradientText>
      {parts[1]}
    </h2>
  );
}
