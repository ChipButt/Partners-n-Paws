window.APP_DATA = {
  activities: [
    {
      id: "secure_field",
      title: "Secure dog field",
      description: "Private enclosed field for relaxed first meetings and off-lead play.",
      distanceLabel: "Usually good for nervous or reactive dogs"
    },
    {
      id: "woodland_walk",
      title: "Woodland walk",
      description: "A relaxed trail walk for chatting while the dogs explore.",
      distanceLabel: "Best for calm walkers and sniffers"
    },
    {
      id: "dog_cafe",
      title: "Dog-friendly café",
      description: "Coffee, cake, and a shorter lower-pressure dog date.",
      distanceLabel: "Good if you want a short first meet"
    },
    {
      id: "dog_park",
      title: "Dog park",
      description: "More social and playful, good for confident dogs.",
      distanceLabel: "Best for outgoing dogs"
    },
    {
      id: "beach_walk",
      title: "Beach walk",
      description: "A bigger date idea for people open to travelling a bit more.",
      distanceLabel: "Best for adventurous matches"
    },
    {
      id: "training_play",
      title: "Training and play session",
      description: "Structured activity with games, recall work, and dog bonding.",
      distanceLabel: "Useful for active dogs and owners"
    }
  ],

  dateOptions: [
    {
      id: "sat_morning",
      title: "Saturday morning",
      description: "10:00–12:00 works well for a first dog date"
    },
    {
      id: "sat_afternoon",
      title: "Saturday afternoon",
      description: "13:00–15:00 if you both prefer a later start"
    },
    {
      id: "sun_morning",
      title: "Sunday morning",
      description: "10:00–12:00 relaxed weekend meetup"
    },
    {
      id: "sun_afternoon",
      title: "Sunday afternoon",
      description: "13:00–15:00 ideal for a lighter daytime date"
    },
    {
      id: "wed_evening",
      title: "Wednesday evening",
      description: "18:30–20:00 midweek option"
    },
    {
      id: "thu_evening",
      title: "Thursday evening",
      description: "18:30–20:00 after-work option"
    }
  ],

  demoCandidates: [
    {
      id: "demo_1",
      avatar: "🐕",
      name: "Amy",
      age: 31,
      town: "Stratford-upon-Avon",
      county: "Warwickshire",
      distanceMiles: 9,
      bio: "Big fan of countryside walks, cosy cafés, and dogs with ridiculous personalities.",
      likeBack: true,
      activityLikes: ["secure_field", "woodland_walk", "dog_cafe"],
      dateLikes: ["sat_morning", "sun_morning", "thu_evening"],
      dog: {
        name: "Milo",
        breed: "Cocker Spaniel",
        age: 3,
        size: "medium",
        temperament: "Friendly and energetic"
      }
    },
    {
      id: "demo_2",
      avatar: "🦮",
      name: "Ben",
      age: 36,
      town: "Evesham",
      county: "Worcestershire",
      distanceMiles: 11,
      bio: "Looking for something genuine. My dog is better at reading people than I am.",
      likeBack: false,
      activityLikes: ["woodland_walk", "dog_park"],
      dateLikes: ["wed_evening", "sat_afternoon"],
      dog: {
        name: "Poppy",
        breed: "Labrador",
        age: 5,
        size: "large",
        temperament: "Confident and sociable"
      }
    },
    {
      id: "demo_3",
      avatar: "🐾",
      name: "Sophie",
      age: 29,
      town: "Redditch",
      county: "Worcestershire",
      distanceMiles: 14,
      bio: "Would absolutely choose a dog field over a loud bar every single time.",
      likeBack: true,
      activityLikes: ["secure_field", "training_play", "dog_cafe"],
      dateLikes: ["sat_morning", "sat_afternoon", "sun_afternoon"],
      dog: {
        name: "Nell",
        breed: "Border Terrier",
        age: 4,
        size: "small",
        temperament: "Playful but can be cautious at first"
      }
    },
    {
      id: "demo_4",
      avatar: "🐶",
      name: "Tom",
      age: 34,
      town: "Leamington Spa",
      county: "Warwickshire",
      distanceMiles: 18,
      bio: "Happy with a low-pressure first meet. Coffee and dogs is already a decent day.",
      likeBack: true,
      activityLikes: ["dog_cafe", "woodland_walk", "dog_park"],
      dateLikes: ["sun_morning", "thu_evening"],
      dog: {
        name: "Maple",
        breed: "Golden Retriever",
        age: 2,
        size: "large",
        temperament: "Very friendly and loves other dogs"
      }
    }
  ]
};
