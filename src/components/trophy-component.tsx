import React from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

function TrophyComponent() {
  return (
    <div className=" mt-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Overhead Press - 10 reps</AccordionTrigger>
          <AccordionContent>
            <ul className="flex list-inside list-disc flex-col gap-2">
              <li>
                <span className="">Silver: 50% du poids de corps</span>
              </li>
              <li>
                <span className="">Gold: 60% du poids de corps</span>
              </li>
              <li>
                <span className="">Platinum: 70% du poids de corps</span>
              </li>
              <li>
                <span className="">Diamant: 80% du poids de corps</span>
              </li>
              <li>
                <span className="">Master: 90% du poids de corps</span>
              </li>
              <li>
                <span className="">Challenger: 100% du poids de corps</span>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Tractions - 5 reps</AccordionTrigger>
          <AccordionContent>
            <ul className="flex list-inside list-disc flex-col gap-2">
              <li>
                <span className="">Poids du corps</span>
              </li>
              <li>
                <span className="">Gold: 10% du poids de corps</span>
              </li>
              <li>
                <span className="">Platinum: 20% du poids de corps</span>
              </li>
              <li>
                <span className="">Diamant: 30% du poids de corps</span>
              </li>
              <li>
                <span className="">Master: 40% du poids de corps</span>
              </li>
              <li>
                <span className="">Grand Master: 50% du poids de corps</span>
              </li>
              <li>
                <span className="">Challenger: 60% du poids de corps</span>
              </li>
            </ul>{" "}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Développé incliné - 5 reps</AccordionTrigger>
          <AccordionContent>
            {" "}
            <ul className="flex list-inside list-disc flex-col gap-2">
              <li>
                <span className="">Silver: 60% du poids du corps</span>
              </li>
              <li>
                <span className="">Gold: 75% du poids de corps</span>
              </li>
              <li>
                <span className="">Platinum: 90% du poids de corps</span>
              </li>
              <li>
                <span className="">Diamant: 105% du poids de corps</span>
              </li>
              <li>
                <span className="">Master: 120% du poids de corps</span>
              </li>
              <li>
                <span className="">Grand Master: 135% du poids de corps</span>
              </li>
              <li>
                <span className="">Challenger: 150% du poids de corps</span>
              </li>
            </ul>{" "}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Développé couché - 5 reps</AccordionTrigger>
          <AccordionContent>
            {" "}
            <ul className="flex list-inside list-disc flex-col gap-2">
              <li>
                <span className="">Silver: 60% du poids du corps</span>
              </li>
              <li>
                <span className="">Gold: 80% du poids de corps</span>
              </li>
              <li>
                <span className="">Platinum: 100% du poids de corps</span>
              </li>
              <li>
                <span className="">Diamant: 120% du poids de corps</span>
              </li>
              <li>
                <span className="">Master: 140% du poids de corps</span>
              </li>
              <li>
                <span className="">Grand Master: 160% du poids de corps</span>
              </li>
              <li>
                <span className="">Challenger: 180% du poids de corps</span>
              </li>
            </ul>{" "}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default TrophyComponent
