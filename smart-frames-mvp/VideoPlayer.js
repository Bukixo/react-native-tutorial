import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import VideoPlayerStyles from './VideoPlayerStyles';

const styles = VideoPlayerStyles;

const VideoPlayer = () => {
	const [videoStatus, setVideoStatus] = useState({});
	const [videoUri, setVideoUri] = useState(null);
	const videoRef = React.useRef(null);

	useEffect(() => {
		const currentVideoRef = videoRef.current;

		return () => {
			videoStatus.isPlaying && currentVideoRef && currentVideoRef.pauseAsync();
		};
	}, [videoStatus]);

	const togglePlayPause = async () => {
		if (videoRef.current) {
			if (videoStatus.isPlaying) {
				await videoRef.current.pauseAsync();
			} else {
				await videoRef.current.playAsync();
			}

			setVideoStatus((prevStatus) => ({ isPlaying: !prevStatus.isPlaying }));
		}
	};

	const openVideoPicker = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({ type: 'video/*' });
			if (result.type === 'success' && result.uri) {
				setVideoUri(result.uri);
				setVideoStatus({ isPlaying: false });
			}
		} catch (error) {
			console.error('Error picking video:', error);
		}
	};

	return (
		<View style={styles.container}>
			{videoUri ? (
				<Video
					ref={videoRef}
					source={{ uri: videoUri }}
					style={styles.video}
					resizeMode="contain"
					shouldPlay={videoStatus.isPlaying}
					isLooping
					useNativeControls
				/>
			) : (
				<Text style={styles.noVideoText}>No video selected</Text>
			)}

			<TouchableOpacity onPress={togglePlayPause} disabled={!videoUri}>
				<Text style={styles.playPauseButton}>{videoStatus.isPlaying ? 'Pause' : 'Play'}</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={openVideoPicker}>
				<Text style={styles.openVideoButton}>Open Video</Text>
			</TouchableOpacity>
		</View>
	);
};

export default VideoPlayer;
