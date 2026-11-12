interface CategoryBadgeProps {
  label: string;
}

export default function CategoryBadge({ label }: CategoryBadgeProps) {
  return <span className="category-badge">{label}</span>;
}
