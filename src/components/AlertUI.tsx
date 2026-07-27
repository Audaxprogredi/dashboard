import Alert from '@mui/material/Alert';

interface AlertConfig {
    description: string;
    severity?: 'success' | 'info' | 'warning' | 'error';
}

export default function AlertUI({ description, severity = 'success' }: AlertConfig) {
    return (
        <Alert variant="standard" severity={severity}>{description}</Alert>
    );
}
