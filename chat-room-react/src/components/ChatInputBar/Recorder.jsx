import React from "react";
import { Box, alpha } from "@mui/system";
import RecordingCard from "./RecordingCard";

const Recorder = ({ open, setFile }) => {
    const [record, setRecord] = React.useState({
        recorder: null,
        file: null,
        error: false,
    });

    React.useEffect(() => {
        if (open && !record?.recorder) {
            setMediaDevice(setRecord);
        } else if (!open && record?.recorder?.state === "recording") {
            record?.recorder?.stop();
        }
    }, [record.recorder, open]);

    React.useEffect(() => {
        if (record.file?.size > 0) {
            setFile && setFile(record.file);
            return;
        }
    }, [record.file, setFile]);

    return open ? (
        <Box
            sx={{
                position: "absolute",
                display: "flex",
                p: 2,
                justifyContent: "center",
                alignItems: "center",
                bgcolor: (theme) =>
                    alpha(theme.palette.background.default, 0.2),
                backdropFilter: "blur(10px)",
                left: 0,
                right: 0,
                bottom: "100%",
                width: "100%",
                height: 50,
            }}
        >
            <RecordingCard disabled={record?.error} />
        </Box>
    ) : (
        <></>
    );
};

const setMediaDevice = async (setData) => {
    try {
        const dev = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });

        const recorder = new MediaRecorder(dev, { mimeType: "audio/webm" });

        let chunks = [];

        recorder.ondataavailable = (blob) =>
            blob.data.size > 0 && chunks.push(blob.data);

        recorder.onstop = (e) => {
            setData((d) => ({
                recorder: null,
                file: new File(chunks, "record_" + new Date().toISOString(), {
                    type: "audio/webm",
                }),
            }));
            recorder.stream.getTracks().forEach((track) => track.stop());
        };

        recorder.onerror = (e, g) =>
            setData((d) => ({ ...d, error: e?.error?.name }));

        recorder.onstart = () => setData((d) => ({ ...d, file: null }));

        recorder.start();

        setData({ recorder: recorder, file: null });
    } catch (e) {
        setData({ error: e });
    }
};

export default Recorder;
