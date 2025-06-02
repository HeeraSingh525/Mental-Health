import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from '@mui/material';

const emotionSummary = [
  { type: 'Happy', count: 35 },
  { type: 'Sad', count: 42 },
  { type: 'Anxious', count: 27 },
  { type: 'Angry', count: 10 },
  { type: 'Neutral', count: 20 },
];

const recentEmotions = [
  {
    id: 1,
    user: 'Aarav Mehta',
    emotion: 'Sad',
    message: 'I don’t feel like doing anything.',
    timestamp: '2025-06-02 14:20',
  },
  {
    id: 2,
    user: 'Ishita Das',
    emotion: 'Happy',
    message: 'I had a really good day today!',
    timestamp: '2025-06-02 13:05',
  },
  {
    id: 3,
    user: 'Sana Kapoor',
    emotion: 'Anxious',
    message: 'I’m worried about my exams.',
    timestamp: '2025-06-02 12:30',
  },
];

const Emotions = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Detected Emotions
      </Typography>

      {/* Emotion Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {emotionSummary.map((emotion, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={idx}>
            <Card>
              <CardContent>
                <Typography variant="h6">{emotion.type}</Typography>
                <Typography variant="h5">{emotion.count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Emotions Table */}
      <Typography variant="h6" gutterBottom>
        Recent Emotions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>User</strong>
              </TableCell>
              <TableCell>
                <strong>Emotion</strong>
              </TableCell>
              <TableCell>
                <strong>Message</strong>
              </TableCell>
              <TableCell>
                <strong>Timestamp</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentEmotions.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.user}</TableCell>
                <TableCell>{entry.emotion}</TableCell>
                <TableCell>{entry.message}</TableCell>
                <TableCell>{entry.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Emotions;
