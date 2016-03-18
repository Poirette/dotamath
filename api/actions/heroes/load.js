import { findAll } from '../../services/heroes';

export default function load() {
  return findAll();
}