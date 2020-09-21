/* Libraries */
import React, {Component, useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Platform, ScrollView, Dimensions, Animated, Easing} from 'react-native';
import Video from 'react-native-video';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import {Portal, Modal} from 'react-native-paper';

// ICONS IMPORT
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// THEME IMPORT
import * as theme from '../../Constants/theme';

// HELPER IMPORT
import Helper from '../../Constants/helper';

// CONSTANTS
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [
                {
                    id: 1,
                    videoUrl:
                        'https://vod-progressive.akamaized.net/exp=1600689184~acl=%2A%2F1229120765.mp4%2A~hmac=8c4b3c9578cfddfe5f3aac439becfc7f0ba9cdb6b650eb28d7d475af189c18ca/vimeo-prod-skyfire-std-us/01/3472/12/317360351/1229120765.mp4?download=1&filename=Pexels+Videos+1906755.mp4',
                    username: 'John Doe',
                    description: 'Lets build a clone of tiktok home page @thesedateddev',
                    likes: '12.3k',
                    comments: '1k',
                    shares: '200',
                    avatar:
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=michael-dam-mEZ3PoFGs_k-unsplash.jpg&w=640',
                    song: 'Katy perry - Roar',
                },
                {
                    id: 2,
                    videoUrl:
                        'https://vod-progressive.akamaized.net/exp=1600689328~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2246%2F17%2F436232831%2F1902084286.mp4~hmac=9f0971f61f91151eef54497fc19895ed538d8c66654df375ebf6eabac0bf45d6/vimeo-prod-skyfire-std-us/01/2246/17/436232831/1902084286.mp4?download=1&filename=production+ID%3A4824398.mp4',
                    username: 'Maria',
                    description: 'Lets build a clone of tiktok home page @thesedateddev',
                    likes: '150k',
                    comments: '2k',
                    shares: '200k',
                    avatar:
                        'https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=minh-pham-5yENNRbbat4-unsplash.jpg&w=640',
                    song: 'Katy perry - Roar',
                },
                {
                    id: 3,
                    videoUrl:
                        'https://vod-progressive.akamaized.net/exp=1600689184~acl=%2A%2F1229120765.mp4%2A~hmac=8c4b3c9578cfddfe5f3aac439becfc7f0ba9cdb6b650eb28d7d475af189c18ca/vimeo-prod-skyfire-std-us/01/3472/12/317360351/1229120765.mp4?download=1&filename=Pexels+Videos+1906755.mp4',
                    username: 'John Doe',
                    description: 'Lets build a clone of tiktok home page @thesedateddev',
                    likes: '12.3k',
                    comments: '1k',
                    shares: '200',
                    avatar:
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=michael-dam-mEZ3PoFGs_k-unsplash.jpg&w=640',
                    song: 'Katy perry - Roar',
                },
                {
                    id: 4,
                    videoUrl:
                        'https://vod-progressive.akamaized.net/exp=1600689328~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2246%2F17%2F436232831%2F1902084286.mp4~hmac=9f0971f61f91151eef54497fc19895ed538d8c66654df375ebf6eabac0bf45d6/vimeo-prod-skyfire-std-us/01/2246/17/436232831/1902084286.mp4?download=1&filename=production+ID%3A4824398.mp4',
                    username: 'Maria',
                    description: 'Lets build a clone of tiktok home page @thesedateddev',
                    likes: '150k',
                    comments: '2k',
                    shares: '200k',
                    avatar:
                        'https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=minh-pham-5yENNRbbat4-unsplash.jpg&w=640',
                    song: 'Katy perry - Roar',
                },
            ],
        };
    }

    static navigationOptions = {
        headerShown: false,
    };

    // LIFECYCLE METHODS
    componentDidMount = () => {};
    // END LIFECYCLE METHODS

    // UTILITY FUNCTIONS
    Video = (props) => {
        const {PlayPauseModal} = this;
        const [isPaused, togglePlayPause] = useState(false);
        const [isPlayPauseModalVisible, togglePlayPauseModal] = useState(false);
        const animateValue = new Animated.Value(0);
        const rotate = animateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });
        const translateX = animateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [WIDTH, -WIDTH],
        });
        useEffect(() => {
            Animated.loop(
                Animated.timing(animateValue, {
                    toValue: 1,
                    duration: 6000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ).start();
        });
        useEffect(() => {
            togglePlayPauseModal(true);
            setTimeout(() => {
                togglePlayPauseModal(false);
            }, 1000);
        }, [isPaused]);
        return (
            <>
                <TouchableOpacity activeOpacity={1} style={{width: WIDTH, height: HEIGHT}} onPress={() => togglePlayPause(!isPaused)}>
                    <Video source={{uri: props.item.videoUrl}} style={{...styles.videoPlayer}} resizeMode={'cover'} repeat={true} paused={isPaused} />
                    {/* VIDEO DESCRIPTION */}
                    <View
                        style={{
                            width: '100%',
                            position: 'absolute',
                            bottom: EStyleSheet.value('80rem'),
                            padding: EStyleSheet.value('18rem'),
                            flexDirection: 'row',
                        }}>
                        <View style={{justifyContent: 'flex-end', overflow: 'hidden', flex: 3}}>
                            <Text style={{color: 'white', fontSize: EStyleSheet.value('18rem'), fontWeight: '700'}}>@{props.item.username}</Text>
                            <Text
                                style={{color: 'white', fontSize: EStyleSheet.value('14rem'), fontWeight: '500', width: EStyleSheet.value('250rem')}}
                                numberOfLines={1}>
                                {props.item.description}
                            </Text>
                            <Animated.Text
                                style={{
                                    color: 'white',
                                    fontSize: EStyleSheet.value('14rem'),
                                    fontWeight: '500',
                                    transform: [{translateX}],
                                }}
                                numberOfLines={1}>
                                {'♫ '}
                                {props.item.song}
                            </Animated.Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <View style={{alignItems: 'center'}}>
                                {/* AVATAR AND FOLLOW */}
                                <View style={{alignItems: 'center'}}>
                                    <Image
                                        source={{uri: props.item.avatar}}
                                        style={{
                                            height: EStyleSheet.value('40rem'),
                                            aspectRatio: 1,
                                            borderRadius: EStyleSheet.value('20rem'),
                                            resizeMode: 'cover',
                                        }}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            height: EStyleSheet.value('20rem'),
                                            aspectRatio: 1,
                                            borderRadius: EStyleSheet.value('10rem'),
                                            backgroundColor: theme.colors.themeRed,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'absolute',
                                            bottom: EStyleSheet.value('-10rem'),
                                        }}>
                                        <MaterialIcons name={'add'} color={'white'} size={EStyleSheet.value('20rem')} />
                                    </TouchableOpacity>
                                </View>
                                {/* LIKES */}
                                <View style={{alignItems: 'center', marginTop: EStyleSheet.value('20rem')}}>
                                    <Ionicons name={'heart'} color={'white'} size={EStyleSheet.value('30rem')} />
                                    <Text style={{color: 'white', fontSize: EStyleSheet.value('14rem')}}>{props.item.likes}</Text>
                                </View>
                                {/* COMMENTS */}
                                <View style={{alignItems: 'center', marginTop: EStyleSheet.value('20rem')}}>
                                    <Ionicons name={'ios-chatbubble-ellipses'} color={'white'} size={EStyleSheet.value('30rem')} />
                                    <Text style={{color: 'white', fontSize: EStyleSheet.value('14rem')}}>{props.item.comments}</Text>
                                </View>
                                {/* SHARES */}
                                <View style={{alignItems: 'center', marginTop: EStyleSheet.value('20rem')}}>
                                    <MaterialCommunityIcons name={'share'} color={'white'} size={EStyleSheet.value('30rem')} />
                                    <Text style={{color: 'white', fontSize: EStyleSheet.value('14rem')}}>{props.item.shares}</Text>
                                </View>
                                {/* CASSETTE */}
                                <View style={{alignItems: 'center', marginTop: EStyleSheet.value('20rem')}}>
                                    <Animated.View
                                        style={{
                                            height: EStyleSheet.value('40rem'),
                                            aspectRatio: 1,
                                            borderRadius: EStyleSheet.value('20rem'),
                                            backgroundColor: 'black',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            transform: [{rotate}],
                                        }}>
                                        <Image
                                            source={{uri: props.item.avatar}}
                                            style={{
                                                height: EStyleSheet.value('25rem'),
                                                aspectRatio: 1,
                                                borderRadius: EStyleSheet.value('13rem'),
                                                resizeMode: 'cover',
                                            }}
                                        />
                                    </Animated.View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <PlayPauseModal isPaused={isPaused} isPlayPauseModalVisible={isPlayPauseModalVisible} />
            </>
        );
    };
    // END UTILITY FUNCTIONS

    // FUNCTIONAL COMPONENTS
    PlayPauseModal = (props) => {
        return (
            <Portal>
                <Modal visible={props.isPlayPauseModalVisible}>
                    <View style={{alignSelf: 'center'}}>
                        <Ionicons name={props.isPaused ? 'play-circle' : 'pause-circle'} color={'grey'} size={EStyleSheet.value('100rem')} />
                    </View>
                </Modal>
            </Portal>
        );
    };

    BottomBar = (props) => {
        return (
            <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
                colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.5)', 'transparent']}
                style={{position: 'absolute', bottom: 0, width: '100%', height: EStyleSheet.value('150rem')}}>
                <SafeAreaView style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingBottom: EStyleSheet.value('15rem')}}>
                        <TouchableOpacity style={{...styles.tabHeader}}>
                            <Octicons name={'home'} color={'white'} size={EStyleSheet.value('22rem')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.tabHeader}}>
                            <Feather name={'search'} color={'white'} size={EStyleSheet.value('22rem')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.tabHeader}}>
                            <View style={{...styles.addButton, backgroundColor: theme.colors.themeBlue, left: 18}} />
                            <View style={{...styles.addButton, backgroundColor: theme.colors.themeRed, right: 18}} />
                            <View style={{...styles.addButton}}>
                                <MaterialIcons name={'add'} color={'black'} size={EStyleSheet.value('22rem')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.tabHeader}}>
                            <Ionicons name={'chatbox-ellipses-outline'} color={'white'} size={EStyleSheet.value('22rem')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.tabHeader}}>
                            <Feather name={'user'} color={'white'} size={EStyleSheet.value('22rem')} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    };
    // END FUNCTIONAL COMPONENTS

    // RENDERING FUNCTIONS
    render() {
        const {BottomBar, Video} = this;
        return (
            <>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.videos}
                    renderItem={({item}) => <Video {...this.props} item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    snapToInterval={HEIGHT}
                    decelerationRate="fast"
                />
                <BottomBar {...this.props} />
            </>
        );
    }
    // END RENDERING FUNCTIONS
}

const styles = EStyleSheet.create({
    videoPlayer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
    },
    tabHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        height: '25rem',
        width: '35rem',
        backgroundColor: 'white',
        borderRadius: '5rem',
        position: 'absolute',
        bottom: '0rem',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;
