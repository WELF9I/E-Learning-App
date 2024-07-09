import React, { FC, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
//@ts-ignore
import BookmarkPressed from '../../assets/categories/BookmarkPressed.png';
//@ts-ignore
import BookmarkNotPressed from '../../assets/categories/BookmarkNotPressed.png';
import { useTheme } from '../../utils/ThemeContext';  // import the custom useTheme hook
import { ScreenProps } from '../../types';
import { useTranslation } from 'react-i18next';

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
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const { t } = useTranslation();
    const courses: Course[] = [
        {
            id_cours: 1,
            NomCourse: 'Design Advanced',
            Bande_annonce_cours: 'https://imgs.search.brave.com/-cFNzgqxn9gTksmxjtwquwyy9QRoUKyuA2Q0DcGi1hM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxRDk3TStjNTlM/LmpwZw',
            Niveau_du_cours: 'Advanced',
            language: 'English',
            duration: '6 weeks',
            topic: t('Graphic Design'),
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
            topic: t('3D Design'),
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
        t('All'),
        t('Graphic Design'),
        t('3D Design'),
        t('Web Development'),
        t('Seo & Marketing'),
        t('Finance & Accounting'),
        t('Personal Development'),
        t('Office Productivity'),
        t('HR Management'),
    ];

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

    const filteredCourses = selectedCategory === t('All')
        ? courses
        : courses.filter(course => course.topic === selectedCategory);

    return (
        <>
            <View style={{ backgroundColor: isDarkMode ? '#333' : '#fff',height:'100%' }}>
            <View style={{ marginTop: 20, backgroundColor: isDarkMode ? '#333' : '#fff' }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => handlePressCategory(category)}
                            style={selectedCategory === category ? (isDarkMode ? styles.ButtonStyle1Dark : styles.ButtonStyle1) : (isDarkMode ? styles.ButtonStyle2Dark : styles.ButtonStyle2)}
                        >
                            <Text style={selectedCategory === category ? styles.textStyle3 : (isDarkMode ? styles.textStyle4Dark : styles.textStyle4)}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={{ backgroundColor: isDarkMode ? '#333' : '#fff' }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                    {filteredCourses.map((course) => (
                        <Card key={course.id_cours} style={isDarkMode ? styles.courseCardDark : styles.courseCard}>
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
                                        <Paragraph style={isDarkMode ? styles.courseTopicDark : styles.courseTopic}>{course.topic}</Paragraph>
                                    </View>
                                    <Title style={isDarkMode ? styles.courseTitleDark : styles.courseTitle}>{course.NomCourse}</Title>
                                    <View style={styles.courseDetails}>
                                        <Text style={styles.coursePrice}>${course.prix}</Text>
                                        <Text style={styles.courseOriginalPrice}>${course.Nouveau_prix}</Text>
                                        <Paragraph style={isDarkMode ? styles.courseTextDark : {}}>
                                            ⭐{course.Scoremin} | {course.NbEssai_Quiz} Std
                                        </Paragraph>
                                    </View>
                                </Card.Content>
                            </View>
                        </Card>
                    ))}
                </ScrollView>
            </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    categoriesContainer: {
        marginBottom: 16,
    },
    ButtonStyle1: {
        backgroundColor: '#167F71',
        marginBottom: 10,
        marginLeft: 5,
        padding: 10,
        borderRadius: 20,
        marginRight: 2,
        elevation: 2,
        shadowRadius: 2,
    },
    ButtonStyle1Dark: {
        backgroundColor: '#4CAF50',
        marginBottom: 10,
        marginLeft: 5,
        padding: 10,
        borderRadius: 20,
        marginRight: 2,
        elevation: 2,
        shadowRadius: 2,
    },
    ButtonStyle2: {
        backgroundColor: '#E8F1FF',
        marginBottom: 10,
        marginLeft: 5,
        padding: 10,
        borderRadius: 20,
        marginRight: 2,
        elevation: 2,
        shadowRadius: 2,
    },
    ButtonStyle2Dark: {
        backgroundColor: '#37474F',
        marginBottom: 10,
        marginLeft: 5,
        padding: 10,
        borderRadius: 20,
        marginRight: 2,
        elevation: 2,
        shadowRadius: 2,
    },
    textStyle3: {
        color: 'white',
        fontWeight: 'bold',
    },
    textStyle4: {
        color: 'black',
    },
    textStyle4Dark: {
        color: 'white',
    },
    scrollViewContent: {
        paddingBottom: 16,
    },
    courseCard: {
        marginBottom: 16,
        backgroundColor: 'white',
        elevation: 2,
    },
    courseCardDark: {
        marginBottom: 16,
        backgroundColor: '#263238',
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
    courseTopicDark: {
        fontSize: 12,
        color: '#FF9800',
        paddingTop: 5,
    },
    courseTitle: {
        fontSize: 14.5,
        fontWeight: 'bold',
        color: '#202244',
        marginVertical: 5,
    },
    courseTitleDark: {
        fontSize: 14.5,
        fontWeight: 'bold',
        color: '#CFD8DC',
        marginVertical: 5,
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
    courseTextDark: {
        color: '#CFD8DC',
    },
    bookmarkIcon: {
        width: 20,
        height: 20,
    },
});
