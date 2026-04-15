output "vpc_id" {
  description = "VPC ID for the portfolio environment."
  value       = module.vpc.vpc_id
}

output "public_subnet_ids" {
  description = "Public subnet IDs for the portfolio environment."
  value       = module.vpc.public_subnet_ids
}

output "availability_zones" {
  description = "Availability zones selected for the portfolio environment."
  value       = module.vpc.availability_zones
}
output "cluster_name" {
  description = "EKS cluster name."
  value       = module.eks.cluster_name
}

output "cluster_endpoint" {
  description = "EKS cluster endpoint."
  value       = module.eks.cluster_endpoint
}

output "cluster_security_group_id" {
  description = "Security group for the EKS cluster."
  value       = module.eks.cluster_security_group_id
}