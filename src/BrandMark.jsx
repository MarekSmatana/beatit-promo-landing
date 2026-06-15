export function BrandMark({ size = "md", withShadow = false }) {
  const sizeClass = size === "sm" ? "size-10 rounded-xl" : "size-11 rounded-xl"

  return (
		<span
			className={`${sizeClass} grid shrink-0 place-items-center overflow-hidden ${withShadow ? "shadow-lg shadow-red-500/25" : ""}`}
		>
			<img
				src="/brand/app-icon.png"
				alt=""
				className="size-full object-cover"
			/>
		</span>
	)
}
