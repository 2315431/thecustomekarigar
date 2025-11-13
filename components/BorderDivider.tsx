export default function BorderDivider() {
  return (
    <div 
      className="w-full h-16 my-16"
      style={{
        backgroundImage: "url('/assets/border-pattern.png')",
        backgroundSize: "auto 100%",
        backgroundRepeat: "repeat-x",
      }}
    />
  )
}

