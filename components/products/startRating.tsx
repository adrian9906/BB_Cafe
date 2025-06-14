"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  productId: number
  initialRating?: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function StarRating({
  productId,
  initialRating = 0,
  onRatingChange,
  readonly = false,
  size = "md",
  showText = true,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  const handleStarClick = (starValue: number) => {
    if (readonly) return

    const newRating = rating === starValue ? 0 : starValue
    setRating(newRating)
    onRatingChange?.(newRating)

    // Guardar en localStorage
    const savedRatings = JSON.parse(localStorage.getItem("bb-cafe-ratings") || "{}")
    savedRatings[productId] = newRating
    localStorage.setItem("bb-cafe-ratings", JSON.stringify(savedRatings))
  }

  const handleStarHover = (starValue: number) => {
    if (readonly) return
    setHoverRating(starValue)
  }

  const handleMouseLeave = () => {
    if (readonly) return
    setHoverRating(0)
  }

  const displayRating = hoverRating || rating
  const ratingText = hoverRating
    ? `Calificar con ${hoverRating} estrella${hoverRating !== 1 ? "s" : ""}`
    : rating > 0
      ? `Tu calificación: ${rating} estrella${rating !== 1 ? "s" : ""}`
      : "Califica este producto"

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1" onMouseLeave={handleMouseLeave}>
        {[1, 2, 3, 4, 5].map((starValue) => {
          const isFilled = starValue <= displayRating
          const isHovered = starValue <= hoverRating

          return (
            <button
              key={starValue}
              type="button"
              className={cn(
                "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 rounded",
                readonly ? "cursor-default" : "cursor-pointer hover:scale-110",
                isHovered && !readonly && "scale-110",
              )}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
              disabled={readonly}
              aria-label={`Calificar con ${starValue} estrella${starValue !== 1 ? "s" : ""}`}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "transition-colors duration-200",
                  isFilled ? "fill-amber-400 text-amber-400" : "fill-transparent text-gray-300 hover:text-amber-300",
                )}
              />
            </button>
          )
        })}
      </div>

      {showText && !readonly && (
        <span className={cn("text-muted-foreground transition-colors duration-200", textSizeClasses[size])}>
          {ratingText}
        </span>
      )}

      {readonly && showText && rating > 0 && (
        <span className={cn("text-muted-foreground", textSizeClasses[size])}>({rating.toFixed(1)})</span>
      )}
    </div>
  )
}
