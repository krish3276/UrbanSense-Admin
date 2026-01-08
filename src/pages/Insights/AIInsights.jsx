import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  Warning,
  CheckCircle,
  Error,
  Lightbulb,
  Psychology,
  LocationOn,
} from '@mui/icons-material';
import { aiInsights } from '../../data/mockData';

const AIInsights = () => {
  const getInsightIcon = (type) => {
    switch (type) {
      case 'recurring':
        return <Warning sx={{ fontSize: 28 }} />;
      case 'pattern':
        return <Psychology sx={{ fontSize: 28 }} />;
      case 'risk':
        return <Error sx={{ fontSize: 28 }} />;
      case 'improvement':
        return <CheckCircle sx={{ fontSize: 28 }} />;
      case 'prediction':
        return <Lightbulb sx={{ fontSize: 28 }} />;
      default:
        return <Psychology sx={{ fontSize: 28 }} />;
    }
  };

  const getInsightColor = (severity) => {
    switch (severity) {
      case 'critical':
        return { bg: '#1C1414', color: '#E74C3C', border: '#3D2020' };
      case 'high':
        return { bg: '#1C1915', color: '#F39C12', border: '#3D3520' };
      case 'medium':
        return { bg: '#151A1C', color: '#3498DB', border: '#203040' };
      case 'positive':
        return { bg: '#151C16', color: '#2ECC71', border: '#204030' };
      case 'warning':
        return { bg: '#1C1A14', color: '#D4A73C', border: '#3D3020' };
      default:
        return { bg: '#1E1E1E', color: '#9A9A9A', border: '#2A2A2A' };
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp sx={{ color: '#E74C3C' }} />;
      case 'decreasing':
        return <TrendingDown sx={{ color: '#2ECC71' }} />;
      case 'stable':
        return <TrendingFlat sx={{ color: '#3498DB' }} />;
      default:
        return null;
    }
  };

  // Mock hotspot data
  const hotspots = [
    { area: 'Main Street Intersection', complaints: 28, type: 'Potholes', risk: 85 },
    { area: 'Westside Water Main', complaints: 15, type: 'Water Leakage', risk: 72 },
    { area: 'Industrial Zone Grid', complaints: 12, type: 'Power Issues', risk: 68 },
    { area: 'Central Park Area', complaints: 8, type: 'Sanitation', risk: 45 },
    { area: 'Downtown Traffic Hub', complaints: 22, type: 'Signals', risk: 78 },
  ];

  // Mock predictions
  const predictions = [
    {
      title: 'Monsoon Season Alert',
      description: 'Expected 40% increase in drainage and road complaints in next 2 weeks',
      confidence: 89,
    },
    {
      title: 'Infrastructure Aging',
      description: 'Zone C power grid may face outages within 30 days',
      confidence: 76,
    },
    {
      title: 'Peak Load Period',
      description: 'Water supply complaints may surge during summer peak',
      confidence: 82,
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Psychology sx={{ fontSize: 32, color: '#D4A73C' }} />
          <Typography variant="h4" fontWeight={700} color="#FFFFFF">
            AI Insights
          </Typography>
        </Box>
        <Typography variant="body1" color="#9A9A9A">
          AI-powered analysis of city infrastructure patterns and predictions
        </Typography>
      </Box>

      {/* Main Insights */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {aiInsights.map((insight) => {
          const colors = getInsightColor(insight.severity);
          return (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={insight.id}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: colors.bg,
                  border: '1px solid',
                  borderColor: colors.border,
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: '#151515',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: colors.color,
                      }}
                    >
                      {getInsightIcon(insight.type)}
                    </Box>
                    {getTrendIcon(insight.trend)}
                  </Box>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ color: colors.color, mb: 1 }}>
                    {insight.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {insight.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      icon={<LocationOn sx={{ fontSize: 14 }} />}
                      label={insight.area}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={insight.severity}
                      size="small"
                      sx={{
                        bgcolor: colors.color,
                        color: 'white',
                        textTransform: 'capitalize',
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Hotspots and Predictions */}
      <Grid container spacing={3}>
        {/* Problem Hotspots */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                🔥 Problem Hotspots
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Areas with recurring complaints identified by AI analysis
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {hotspots.map((spot, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {spot.area}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {spot.complaints} complaints • {spot.type}
                        </Typography>
                      </Box>
                      <Chip
                        label={`${spot.risk}% Risk`}
                        size="small"
                        color={spot.risk > 70 ? 'error' : spot.risk > 50 ? 'warning' : 'success'}
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={spot.risk}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: '#2A2A2A',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: spot.risk > 70 ? '#E74C3C' : spot.risk > 50 ? '#F39C12' : '#2ECC71',
                        },
                      }}
                    />
                    {index < hotspots.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Predictive Alerts */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                🔮 Predictive Alerts
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                AI-generated predictions for potential issues
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {predictions.map((pred, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: '#1E1E1E',
                      border: '1px solid',
                      borderColor: '#2A2A2A',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {pred.title}
                      </Typography>
                      <Chip
                        label={`${pred.confidence}% confident`}
                        size="small"
                        color={pred.confidence > 80 ? 'error' : 'warning'}
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {pred.description}
                    </Typography>
                    <Box sx={{ mt: 1.5 }}>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                        Confidence Level
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={pred.confidence}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          bgcolor: '#2A2A2A',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: pred.confidence > 80 ? '#E74C3C' : '#F39C12',
                          },
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Trend Summary */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            📊 AI Summary
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#1C1414', borderRadius: 2 }}>
                <Typography variant="h3" fontWeight={700} color="#E74C3C">
                  5
                </Typography>
                <Typography variant="body2" color="#9A9A9A">
                  Critical Hotspots
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#1C1A14', borderRadius: 2 }}>
                <Typography variant="h3" fontWeight={700} color="#F39C12">
                  12
                </Typography>
                <Typography variant="body2" color="#9A9A9A">
                  Recurring Patterns
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#151A1C', borderRadius: 2 }}>
                <Typography variant="h3" fontWeight={700} color="#3498DB">
                  3
                </Typography>
                <Typography variant="body2" color="#9A9A9A">
                  Active Predictions
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#151C16', borderRadius: 2 }}>
                <Typography variant="h3" fontWeight={700} color="#2ECC71">
                  87%
                </Typography>
                <Typography variant="body2" color="#9A9A9A">
                  Prediction Accuracy
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AIInsights;
