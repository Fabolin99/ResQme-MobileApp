import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import bensonImage from "../../../assets/images/benson.jpg";
import pawPrint from "../../../assets/images/paw-print.png";
import { Ionicons } from '@expo/vector-icons';

const tips = [
  "Regular check-ups with the vet can keep your pet healthy and happy.",
  "Pets need a balanced diet to stay healthy. Make sure to research what kind of food is best for your pet's breed and age.",
  "Regular exercise is important for your pet's physical and mental health. Make sure to provide plenty of playtime and walks.",
  "Training your pet can strengthen your bond with them and also ensure they are well-behaved.",
  "Socialization is important for pets. Introduce them to a variety of experiences so they can be comfortable in different situations.",
  "Remember, adopting a pet is a long-term commitment. Make sure you're ready for the responsibility before bringing a pet home."
];


const getRandomTip = () => {
  const index = Math.floor(Math.random() * tips.length);
  return tips[index];
};

const upcomingHolidays = [
  {
    date: '2024-07-04',
    name: 'Independence Day',
  },
  {
    date: '2024-09-02',
    name: 'Labor Day',
  },
  // Add more events/holidays as needed...
];

const getClosestHoliday = () => {
  const today = new Date();
  const upcomingDates = upcomingHolidays.map((event) => new Date(event.date));
  const closestDate = new Date(Math.min(...upcomingDates.filter(date => date > today).map(date => date.getTime())));

  const closestEvent = upcomingHolidays.find((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getTime() === closestDate.getTime();
  });

  return closestEvent ? `${closestEvent.name} - ${closestEvent.date}` : '';
};


const news = [
  {
    title: 'New Program Launch!',
    date: '2024-03-21',
    content: 'We are excited to announce the launch of our new program aimed at empowering young girls in STEM fields.',
  },
  // Add more news as needed...
];

const getLatestNews = () => {
  const latestNews = news.reduce((acc, curr) =>
    new Date(curr.date) > new Date(acc.date) ? curr : acc
  );
  return latestNews;
};

const HomeScreen = () => {
    const ourStory = "Meet Benson, the cat that changed my life. Benson was rescued from an animal shelter after being there for many months. Benson saw how many cats were adopted and had a happy life. When I saw Benson the first time, I saw a cat that wanted a second opportunity but life hasn't been fair. That moment is when I adopted her and my life changed.\n\nBenson quickly became a part of my life, turning her world upside down. The once quiet apartment was now filled with tiny meows and the patter of little paws. Seeing Benson's transformation from a scared kitten to a playful, happy cat, I fell in love with the idea of adoption. My hope is to give more animals like Benson a second chance at life.";
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentScreenIndex, setCurrentScreenIndex] = useState(0);


    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentScreenIndex((prevIndex) => (prevIndex + 1) % screens.length);
        }, 6000); // Change screen every 6 seconds

        return () => clearInterval(timer);
      }, []);

      const handleNext = () => {
        setCurrentScreenIndex((prevIndex) => (prevIndex + 1) % screens.length);
      };

      const handlePrev = () => {
        setCurrentScreenIndex((prevIndex) =>
          prevIndex === 0 ? screens.length - 1 : prevIndex - 1
        );
      };

      const screens = [
        {
          title: 'Tip of the Day:',
          content: getRandomTip(),
        },
        {
          title: 'Upcoming Holiday:',
          content: getClosestHoliday(),
        },
        {
          title: 'Latest News:',
          content: `${getLatestNews().title} - ${getLatestNews().date}`,
        },
      ];

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const navigation = useNavigation();
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const date = new Date();
        const hour = date.getHours();

        if (hour < 12) {
            setGreeting('Good Morning');
        } else if (hour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, []);

    const onPetPressed = () => {
        navigation.navigate('Pet');
    };

    const onPostPetPressed = () => {
        navigation.navigate('Post');
      };

    return (
        <View style={styles.container}>
            <AppHeader />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.text}>{greeting}, User</Text>

                {/* carrousel */}
                <View style={{ backgroundColor: '#8da9c4', padding: 10, borderRadius: 10, margin: 10, width: 370, height: 150 }}>
                  <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 10 }}>
                    {screens[currentScreenIndex].title}
                  </Text>
                  <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 10 }}>
                    {screens[currentScreenIndex].content}
                  </Text>
                  {screens[currentScreenIndex].links && (
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                      {screens[currentScreenIndex].links.map((link) => (
                        <TouchableOpacity
                          key={link.name}
                          onPress={() => void openApp(link.url, 'link')}
                          style={{ width: 40, height: 40, marginHorizontal: 10 }}
                        >
                          <Image source={link.icon} style={{ width: 40, height: 40 }} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
                {/* carrousel */}

                {/* pet section */}
                <View style={styles.petSection}>
                    <Text style={styles.petIntro}>Explore the Pet Screen to learn more about our adorable pets waiting for their forever home.</Text>
                    <Image source={pawPrint} style={styles.pawImage} />
                    <TouchableOpacity style={styles.petButton} onPress={onPetPressed}>
                        <Text style={styles.petButtonText}>Go to Pet Screen</Text>
                    </TouchableOpacity>
                </View>
                {/* pet section */}

                {/* post pet section */}
                <View style={styles.postPetSection}>
                  <Text style={styles.postPetIntro}>Have a pet that needs a new home? Post them here so they can be discovered by potential adopters.</Text>
                  <TouchableOpacity style={styles.postPetButton} onPress={onPostPetPressed}>
                    <Ionicons name="add-circle-outline" size={24} color="white" />
                    <Text style={styles.postPetButtonText}>Post a Pet</Text>
                  </TouchableOpacity>
                </View>
                {/* post pet section */}

                {/* story section */}
                <View style={styles.storySection}>
                    <Text style={styles.storyTitle}>Our Story</Text>
                    <Text style={styles.storyContent}>{ourStory}</Text>
                    <TouchableOpacity onPress={flipCard} style={styles.flipCard}>
                        {isFlipped ? (
                            <View style={styles.flipCardInfo}>
                                <Text><Text style={styles.boldText}>Name:</Text> Benson</Text>
                                <Text><Text style={styles.boldText}>Rescued in:</Text> Rexburg, ID</Text>
                                <Text><Text style={styles.boldText}>Age:</Text> 3 years old</Text>
                                <Text><Text style={styles.boldText}>Favorite hobby:</Text> Sleep</Text>
                            </View>
                        ) : (
                            <Image source={bensonImage} style={styles.storyImage} />
                        )}
                    </TouchableOpacity>
                </View>
                {/* story section */}

            </ScrollView>
            <AppFooter />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
     boldText: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    carouselImage: {
        width: 330,
        height: 300,
        margin: 10,
    },
    petSection: {
        width: '100%',
        backgroundColor: '#8da9c4',
        borderRadius: 5,
        padding: 10,
        marginTop: 30,
        marginBottom: 20,
    },
    petIntro: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    pawImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 10,
    },
    petButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
    },
    petButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
    },
    postPetSection: {
        width: '100%',
        backgroundColor: '#8da9c4',
        borderRadius: 5,
        padding: 10,
        marginTop: 30,
        marginBottom: 20,
      },
      postPetIntro: {
        fontSize: 16,
        marginBottom: 10,
      },
      postPetButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c82333',
        padding: 10,
        borderRadius: 5,
      },
      postPetButtonText: {
        color: 'white',
        marginLeft: 10,
      },
    storySection: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#8da9c4',
        borderRadius: 5,
        marginBottom: 30,
    },
    storyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    storyContent: {
        marginTop: 10,
        fontSize: 16,
    },
    flipCard: {
        width: 200,
        height: 200,
        borderRadius: 5,
        marginTop: 18,
    },
    flipCardInfo: {
        padding: 10,
        marginLeft: 120,
    },
    storyImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginLeft: 75,
    },
});

export default HomeScreen;