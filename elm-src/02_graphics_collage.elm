import Graphics.Collage exposing (..)
import Color

main = let bluePill = circle 10 |> filled Color.blue
       in collage 300 300 [bluePill]
