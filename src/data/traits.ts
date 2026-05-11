import type { Trait } from "@/types/traits";

const husband: Trait = {
  title: "Husband",
  description: "I am married to the most amazing wife any man could ask for",
  image: "husband",
};

const adventurer: Trait = {
  title: "Adventurer",
  description: "The outdoors is the funnest play ground anyone could ask for",
  image: "adventure",
};

const christ: Trait = {
  title: "Christ Follower",
  description:
    "Jesus Christ is my Lord and Savior and I aspire to live a life as he did",
  image: "christ",
};

const friend: Trait = {
  title: "Friend",
  description: "I love my friends and the memories we create together",
  image: "friend",
};

/*
 * traits
 *
 * Array of personal trait entries representing different aspects of the "personal" profile.
 * Each trait includes a title, description, and associated image.
 *
 * @type {Trait[]}
 *
 * */
export const traits: Trait[] = [husband, adventurer, christ, friend];
