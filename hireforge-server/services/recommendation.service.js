const { resourceLimits } = require("worker_threads");
const TestResult = require("../models/TestResult");

// ─── Constants ────────────────────────────────────────────────────────────────
const WEAK_TOPIC_THRESHOLD = 60; // accuracy % below this → weak topic
const STRONG_TOPIC_THRESHOLD = 80; // accuracy % above this → strength

// ─── calculateTopicAccuracy ───────────────────────────────────────────────────
/**
 * Aggregates all TestResult records for a user and returns per-topic accuracy.
 *
 * @param {string} userId
 * @returns {Promise<Array<{ topic: string, correct: number, total: number, accuracy: number }>>}
 */
async function calculateTopicAccuracy(userId) {
  const results = await TestResult.find({ userId }).lean();
  //...
  console.log("cnt is",results)
  if (!results.length) return [];

  // Group by topic
  const topicMap = {};

  for (const r of results) {
    if (!topicMap[r.topic]) {
      topicMap[r.topic] = { correct: 0, total: 0 };
    }
    topicMap[r.topic].total += 1;
    if (r.isCorrect) topicMap[r.topic].correct += 1;
  }

  return Object.entries(topicMap).map(([topic, stats]) => ({
    topic,
    correct: stats.correct,
    total: stats.total,
    accuracy: parseFloat(((stats.correct / stats.total) * 100).toFixed(1)),
  }));
}

// ─── calculateSubtopicAccuracy ────────────────────────────────────────────────
/**
 * Returns per-subtopic accuracy for a user (used internally for detailed breakdown).
 *
 * @param {string} userId
 * @returns {Promise<Array<{ topic: string, subtopic: string, correct: number, total: number, accuracy: number }>>}
 */
async function calculateSubtopicAccuracy(userId) {
  const results = await TestResult.find({ userId }).lean();

  if (!results.length) return [];

  const map = {};

  for (const r of results) {
    const key = `${r.topic}::${r.subtopic}`;
    if (!map[key]) {
      map[key] = { topic: r.topic, subtopic: r.subtopic, correct: 0, total: 0 };
    }
    map[key].total += 1;
    if (r.isCorrect) map[key].correct += 1;
  }

  return Object.values(map).map((s) => ({
    ...s,
    accuracy: parseFloat(((s.correct / s.total) * 100).toFixed(1)),
  }));
}

// ─── findWeakTopics ───────────────────────────────────────────────────────────
/**
 * Returns topics where accuracy is below WEAK_TOPIC_THRESHOLD (60%).
 *
 * @param {string} userId
 * @returns {Promise<Array<{ topic: string, accuracy: number, correct: number, total: number }>>}
 */
async function findWeakTopics(userId) {
  const topicAccuracy = await calculateTopicAccuracy(userId);

  return topicAccuracy
    .filter((t) => t.accuracy < WEAK_TOPIC_THRESHOLD)
    .sort((a, b) => a.accuracy - b.accuracy); // worst first
}

// ─── generateRecommendationSummary ───────────────────────────────────────────
/**
 * Builds a full recommendation summary for a user.
 *
 * @param {string} userId
 * @returns {Promise<{
 *   weakTopics: Array,
 *   strengths: Array,
 *   improvementAreas: Array,
 *   topicAccuracy: Array,
 *   subtopicAccuracy: Array,
 *   totalQuestionsAttempted: number
 * }>}
 */
async function generateRecommendationSummary(userId) {
  const [topicAccuracy, subtopicAccuracy] = await Promise.all([
    calculateTopicAccuracy(userId),
    calculateSubtopicAccuracy(userId),
  ]);

  const weakTopics = topicAccuracy
    .filter((t) => t.accuracy < WEAK_TOPIC_THRESHOLD)
    .sort((a, b) => a.accuracy - b.accuracy);

  const strengths = topicAccuracy
    .filter((t) => t.accuracy >= STRONG_TOPIC_THRESHOLD)
    .sort((a, b) => b.accuracy - a.accuracy);

  // Improvement areas: topics between 60–80% (not weak, not strong yet)
  const improvementAreas = topicAccuracy
    .filter(
      (t) =>
        t.accuracy >= WEAK_TOPIC_THRESHOLD &&
        t.accuracy < STRONG_TOPIC_THRESHOLD
    )
    .sort((a, b) => a.accuracy - b.accuracy);

  const totalQuestionsAttempted = topicAccuracy.reduce(
    (sum, t) => sum + t.total,
    0
  );

  return {
    weakTopics,
    strengths,
    improvementAreas,
    topicAccuracy,
    subtopicAccuracy,
    totalQuestionsAttempted,
  };
}

module.exports = {
  calculateTopicAccuracy,
  calculateSubtopicAccuracy,
  findWeakTopics,
  generateRecommendationSummary,
};
