export const analyzeTicket = async ({
  title,
  description,
  category,
}) => {
  const text =
    `${title} ${description}`.toLowerCase();

  let suggestedCategory = category || "Other";
  let priority = "Medium";
  let summary =
    "Customer support request submitted.";

  // Billing
  if (
    text.includes("payment") ||
    text.includes("charged") ||
    text.includes("refund") ||
    text.includes("billing") ||
    text.includes("money")
  ) {
    suggestedCategory = "Billing";
  }

  // Technical
  else if (
    text.includes("error") ||
    text.includes("bug") ||
    text.includes("login") ||
    text.includes("website") ||
    text.includes("not working")
  ) {
    suggestedCategory = "Technical";
  }

  // Account
  else if (
    text.includes("account") ||
    text.includes("password") ||
    text.includes("profile")
  ) {
    suggestedCategory = "Account";
  }

  // Order
  else if (
    text.includes("order") ||
    text.includes("product")
  ) {
    suggestedCategory = "Order";
  }

  // Delivery
  else if (
    text.includes("delivery") ||
    text.includes("delivered") ||
    text.includes("shipping")
  ) {
    suggestedCategory = "Delivery";
  }

  // Priority
  if (
    text.includes("urgent") ||
    text.includes("immediately") ||
    text.includes("critical") ||
    text.includes("twice") ||
    text.includes("charged twice")
  ) {
    priority = "High";
  } else if (
    text.includes("soon") ||
    text.includes("problem") ||
    text.includes("issue")
  ) {
    priority = "Medium";
  } else {
    priority = "Low";
  }

  summary =
    `Customer reported an issue related to ${suggestedCategory.toLowerCase()}.`;

  return {
    category: suggestedCategory,
    priority,
    summary,
  };
};