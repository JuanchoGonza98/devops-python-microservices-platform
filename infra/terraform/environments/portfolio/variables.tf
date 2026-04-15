variable "aws_region" {
  description = "AWS region where the portfolio environment will be created."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for naming and tagging."
  type        = string
  default     = "devops-platform"
}

variable "environment" {
  description = "Environment name."
  type        = string
  default     = "portfolio"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
  default     = "10.30.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for the two public subnets."
  type        = list(string)
  default = [
    "10.30.1.0/24",
    "10.30.2.0/24"
  ]
}
variable "cluster_name" {
  description = "Name of the EKS cluster."
  type        = string
  default     = "devops-portfolio-eks"
}
variable "cluster_version" {
  description = "Kubernetes version for EKS."
  type        = string
  default     = "1.33"
}

variable "cluster_endpoint_public_access_cidrs" {
  description = "CIDR blocks allowed to access the public Kubernetes API endpoint."
  type        = list(string)
}

variable "node_instance_types" {
  description = "EC2 instance types for the managed node group."
  type        = list(string)
  default     = ["t3.medium"]
}

variable "node_desired_size" {
  description = "Desired number of worker nodes."
  type        = number
  default     = 1
}

variable "node_min_size" {
  description = "Minimum number of worker nodes."
  type        = number
  default     = 1
}

variable "node_max_size" {
  description = "Maximum number of worker nodes."
  type        = number
  default     = 2
}