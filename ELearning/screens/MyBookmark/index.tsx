import React, { FC, useState } from 'react';
import { ScreenProps } from '../../types';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
// @ts-ignore
import BookmarkPressed from '../../assets/categories/BookmarkPressed.png';
// @ts-ignore
import BookmarkNotPressed from '../../assets/categories/BookmarkNotPressed.png';

interface Course {
    id_cours: number;
    NomCourse: string;
    Bande_annonce_cours: string;
    Niveau_du_cours: string;
    language: string;
    duration: string;
    topic: string;
    date_Creations: Date;
    Date_miseaj: Date;
    Information_de_cours: string;
    courseRequirement: string;
    prix: number;
    reduction: boolean;
    Nouveau_prix: number;
    description: string;
    Sous_titre: string;
    Scoremin: number;
    NbEssai_Quiz: number;
}

export const MyBookmark: FC<ScreenProps<'MyBookmark'>> = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const courses: Course[] = [
        {
            id_cours: 1,
            NomCourse: 'Design Advanced',
            Bande_annonce_cours: 'https://imgs.search.brave.com/-cFNzgqxn9gTksmxjtwquwyy9QRoUKyuA2Q0DcGi1hM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxRDk3TStjNTlM/LmpwZw',
            Niveau_du_cours: 'Advanced',
            language: 'English',
            duration: '6 weeks',
            topic: 'Graphic Design',
            date_Creations: new Date('2023-01-01'),
            Date_miseaj: new Date('2023-01-10'),
            Information_de_cours: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            courseRequirement: 'Basic knowledge of design tools',
            prix: 28,
            reduction: true,
            Nouveau_prix: 20,
            description: 'This course covers advanced techniques in graphic design.',
            Sous_titre: 'Learn advanced graphic design skills',
            Scoremin: 4.2,
            NbEssai_Quiz: 7830
        },
        {
            id_cours: 2,
            NomCourse: 'Graphic Advertisement',
            Bande_annonce_cours: 'https://imgs.search.brave.com/-cFNzgqxn9gTksmxjtwquwyy9QRoUKyuA2Q0DcGi1hM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxRDk3TStjNTlM/LmpwZw',
            Niveau_du_cours: 'Intermediate',
            language: 'English',
            duration: '4 weeks',
            topic: '3D Design',
            date_Creations: new Date('2023-02-01'),
            Date_miseaj: new Date('2023-02-10'),
            Information_de_cours: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            courseRequirement: 'None',
            prix: 42,
            reduction: false,
            Nouveau_prix: 42,
            description: 'Master the art of graphic advertisement.',
            Sous_titre: 'Create effective graphic ads',
            Scoremin: 4.1,
            NbEssai_Quiz: 5047
        },
    ];

    const [bookmarkedCourses, setBookmarkedCourses] = useState<number[]>(courses.map(course => course.id_cours));

    const categories = [
        'All',
        'Graphic Design',
        '3D Design',
        'Web Development',
        'Seo & Marketing',
        'Finance & Accounting',
        'Personal Development',
        'Office Productivity',
        'HR Management',
    ];

    const textStyle1 = {
        color: '#3399ff',
    };
    const textStyle2 = {
        color: 'black',
    };

    const textStyle3 = {
        color: 'white',
        fontWeight: 'bold',
    };
    const textStyle4 = {
        color: 'black',
    };

    const ButtonStyle1 = {
        backgroundColor: '#167F71',
        marginBottom: 10,
        marginLeft: 5,
        padding: 10,
        borderRadius: 20,
        marginRight: 2,
        elevation: 2,
        shadowRadius: 2,
    };

    const ButtonStyle2 = {
        backgroundColor: '#E8F1FF',
        marginBottom: 10,
        marginLeft: 5,
        padding: 10,
        borderRadius: 20,
        marginRight: 2,
        elevation: 2,
        shadowRadius: 2,
    };

    const handlePressCategory = (category: string) => {
        setSelectedCategory(category);
    };

    const showToastWithGravity = (text: string) => {
        ToastAndroid.showWithGravity(
            text,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    const toggleBookmark = (id: number) => {
        setBookmarkedCourses(prev => {
            const isBookmarked = prev.includes(id);
            const updatedBookmarks = isBookmarked
                ? prev.filter(courseId => courseId !== id)
                : [...prev, id];
            
            showToastWithGravity(isBookmarked ? 'Bookmark Removed!' : 'Bookmark Added!');
            return updatedBookmarks;
        });
    };

    const filteredCourses = selectedCategory === 'All'
        ? courses
        : courses.filter(course => course.topic === selectedCategory);

    return (
        <>
            <View style={{ marginTop: 20 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => handlePressCategory(category)}
                            style={selectedCategory === category ? ButtonStyle1 : ButtonStyle2}
                        >
                            <Text style={selectedCategory === category ? textStyle3 : textStyle4}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                    {filteredCourses.map((course) => (
                        <Card key={course.id_cours} style={styles.courseCard}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Card.Cover source={{ uri: course.Bande_annonce_cours }} style={styles.courseImage} />
                                <Card.Content style={{ paddingTop: 25, width: '63%' }}>
                                    <View style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row-reverse' }}>
                                        <TouchableOpacity onPress={() => toggleBookmark(course.id_cours)} style={{ paddingTop: 10 }}>
                                            <Image
                                                source={bookmarkedCourses.includes(course.id_cours) ? BookmarkPressed : BookmarkNotPressed}
                                                style={styles.bookmarkIcon}
                                            />
                                        </TouchableOpacity>
                                        <Paragraph style={styles.courseTopic}>{course.topic}</Paragraph>
                                    </View>
                                    <Title style={styles.courseTitle}>{course.NomCourse}</Title>
                                    <View style={styles.courseDetails}>
                                        <Text style={styles.coursePrice}>${course.prix}</Text>
                                        <Text style={styles.courseOriginalPrice}>${course.Nouveau_prix}</Text>
                                        <Paragraph>
                                            ⭐{course.Scoremin} | {course.NbEssai_Quiz} Std
                                        </Paragraph>
                                    </View>
                                </Card.Content>
                            </View>
                        </Card>
                    ))}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    categoriesContainer: {
        marginBottom: 16,
    },
    categoryButton: {
        backgroundColor: '#E8F1FF',
        marginBottom: 10,
        marginLeft: 5,
        padding: 10,
        borderRadius: 20,
        marginRight: 2,
        elevation: 2,
        shadowRadius: 2,
    },
    categoryType: {
        marginRight: 4,
        padding: 5,
        borderRadius: 20,
        color: '#A0A4AB',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#202244',
    },
    sectionLittleTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3399ff',
    },
    CategoriesSeeAll: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    courseDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coursePrice: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#3399ff',
        marginRight: 10,
    },
    courseOriginalPrice: {
        fontSize: 14,
        color: '#999',
        textDecorationLine: 'line-through',
        marginRight: 10,
    },
    scrollViewContent: {
        paddingBottom: 16,
    },
    card: {
        marginBottom: 16,
    },
    courseCard: {
        marginBottom: 16,
        backgroundColor: 'white',
        elevation: 2,
    },
    courseImage: {
        height: 150,
        width: 140,
    },
    courseTopic: {
        fontSize: 12,
        color: '#FF6B00',
        paddingTop: 5,
    },
    courseTitle: {
        fontSize: 14.5,
        fontWeight: 'bold',
        color: '#202244',
        marginVertical: 5,
    },
    filterIcon: {
        width: 34,
        height: 34,
    },
    bookmarkIcon: {
        width: 20,
        height: 20,
    },
});
