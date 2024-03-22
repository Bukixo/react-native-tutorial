import { StyleSheet } from 'react-native';

export default VideoPlayerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: 300,
        height: 200,
        marginBottom: 20,
    },
    noVideoText: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 20,
    },
    playPauseButton: {
        fontSize: 18,
        color: 'blue',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    openVideoButton: {
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold'
    },
});