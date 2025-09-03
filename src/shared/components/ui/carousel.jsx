import React, { createContext, useContext, useState, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/shared/utils/cn"
import { Button } from "./button"

const CarouselContext = createContext()

const Carousel = ({ className, children, ...props }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsCount, setItemsCount] = useState(0)

  const scrollPrev = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : itemsCount - 1)
  }

  const scrollNext = () => {
    setCurrentIndex(prev => prev < itemsCount - 1 ? prev + 1 : 0)
  }

  const canScrollPrev = currentIndex > 0
  const canScrollNext = currentIndex < itemsCount - 1

  return (
    <CarouselContext.Provider value={{
      currentIndex,
      setCurrentIndex,
      itemsCount,
      setItemsCount,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext
    }}>
      <div className={cn("relative", className)} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

const CarouselContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { currentIndex, setItemsCount } = useContext(CarouselContext)
  
  useEffect(() => {
    setItemsCount(React.Children.count(children))
  }, [children, setItemsCount])

  return (
    <div className="overflow-hidden">
      <div
        ref={ref}
        className={cn("flex transition-transform duration-300", className)}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        {...props}
      >
        {children}
      </div>
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
    {...props}
  />
))
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useContext(CarouselContext)

  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={cn("absolute h-8 w-8 rounded-full -left-12 top-1/2 -translate-y-1/2", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useContext(CarouselContext)

  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={cn("absolute h-8 w-8 rounded-full -right-12 top-1/2 -translate-y-1/2", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}